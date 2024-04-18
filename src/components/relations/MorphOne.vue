<template>
  <v-container>
    <v-form>
      <v-container fluid class="px-0">
        <v-row justify="center">
          <model-input v-model="relatedModel" label="Related model" md="4"/>
          <morph-type-input v-model="relatedType" :modelName="relatedModel" label="Related type" md="4"/>
        </v-row>
        <options-bar v-model:asTrait="asTrait" v-model:withScopes="withScopes" md="4"/>
      </v-container>
    </v-form>
    <code-component :codeText="output" :filename="filename" />
  </v-container>
</template>

<script lang="ts">
import { debounce, camelCase } from 'lodash';
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { ModelInput, CodeComponent, OptionsBar, MorphTypeInput } from '@components';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';

export default defineComponent({
  name: 'MorphOneRelationBuilder',
  components: {
    ModelInput,
    CodeComponent,
    OptionsBar,
    MorphTypeInput,
  },
  setup() {
    const appStore = useAppStore();
    const { MORPH_ONE, morphOneStub, morphOneScopes } = useConstants();
    let output = ref('');

    const relatedModel = ref('Comment');
    const relatedType = ref('commentable'); 

    const asTrait = ref(true);
    const withScopes = ref(false);
    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await morphOneStub();
      let finalOutput = initialStub.replace(/{{\s*scopes\s*}}/g, withScopes.value ? await morphOneScopes() : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, camelCase(relatedModel.value)) // Singular method name
        .replace(/{{\s*relatedModel\s*}}/g, relatedModel.value)
        .replace(/{{\s*relatedType\s*}}/g, relatedType.value);
      
      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, MORPH_ONE(relatedModel.value), finalOutput);
      }

      output.value = finalOutput;
    };

    watch(() => [
      relatedType.value,
      relatedModel.value,
      namespace.value,
      asTrait.value,
      withScopes.value,
    ], debounce(generateRelation, 300));

    onMounted(generateRelation);

    return {
      relatedType,
      relatedModel,
      output,
      asTrait,
      withScopes,
      filename: MORPH_ONE(relatedModel.value) // Adjust filename to reflect the relationship
    };
  },
});
</script>
