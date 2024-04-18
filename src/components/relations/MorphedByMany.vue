<template>
  <v-container>
    <v-form>
      <v-container fluid class="px-0">
        <v-row justify="center">
          <model-input v-model="morphToModel" label="Morph to model" md="4"/>
          <morph-type-input v-model="relatedType" :modelName="morphToModel" label="Related type" md="4"/>
          <model-input v-model="morphedByModel" label="Morphed by model" md="4"/>
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
  name: 'MorphedByManyRelationBuilder',
  components: {
    ModelInput,
    CodeComponent,
    OptionsBar,
    MorphTypeInput,
  },
  setup() {
    const appStore = useAppStore();
    const { MORPHED_BY_MANY, morphedByManyStub, morphedByManyScopes } = useConstants();
    let output = ref('');

    const morphToModel = ref('Tag'); // Example usage
    const morphedByModel = ref('Post'); // Example usage
    const relatedType = ref('taggable'); // Typically the relation name used in the database

    const asTrait = ref(true);
    const withScopes = ref(false);
    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await morphedByManyStub();
      let finalOutput = initialStub.replace(/{{\s*scopes\s*}}/g, withScopes.value ? await morphedByManyScopes() : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, camelCase(morphedByModel.value) + 's') // Method name to access the relation
        .replace(/{{\s*relatedModel\s*}}/g, morphedByModel.value)
        .replace(/{{\s*relatedType\s*}}/g, relatedType.value);
      
      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, MORPHED_BY_MANY(morphedByModel.value), finalOutput);
      }

      output.value = finalOutput;
    };

    watch(() => [
      relatedType.value,
      morphToModel.value,
      namespace.value,
      asTrait.value,
      withScopes.value,
    ], debounce(generateRelation, 300));

    onMounted(generateRelation);

    return {
      relatedType,
      morphedByModel,
      morphToModel,
      output,
      asTrait,
      withScopes,
      filename: MORPHED_BY_MANY(morphedByModel.value) // Adjust filename to reflect the relationship
    };
  },
});
</script>
