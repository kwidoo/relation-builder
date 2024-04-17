<template>
  <v-container>
    <v-form>
      <v-container fluid class="px-0">
        <v-row align="center">
          <model-input v-model="ownerModel" label="Model" />
          <local-key v-model="localKey" mode="local" label="Local key" />
          <foreign-key v-model="foreignKey" mode="foreign" :modelName="ownerModel" label="Foreign key" />
          <model-input v-model="relatedModel" label="Related model" />
        </v-row>
        <options-bar v-model:asTrait="asTrait" v-model:withScopes="withScopes" md="4" />

      </v-container>
    </v-form>

    <code-component :codeText="output" :filename="filename" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, computed, Ref } from 'vue';
import { ForeignKey, LocalKey, ModelInput, CodeComponent,    OptionsBar, } from '@components';
import { debounce, camelCase } from 'lodash';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';
import { } from 'vue';

export default defineComponent({
  name: 'HasOneRelationBuilder',
  components: {
    ForeignKey,
    LocalKey,
    ModelInput,
    CodeComponent,
    OptionsBar,
  },
  setup() {
    const appStore = useAppStore();
    const { HAS_ONE, hasOneStub, hasOneScopes } = useConstants();
    let output: Ref<string> = ref('');

    const ownerModel = ref('User');
    const relatedModel = ref('Post');
    const localKey = ref('id');
    const foreignKey = ref('user_id');
    const asTrait: Ref<boolean> = ref(true);
    const withScopes: Ref<boolean> = ref(false);


    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await hasOneStub();
      let finalOutput = initialStub; 

      let scopes = await hasOneScopes();
      finalOutput = finalOutput.replace(/{{\s*scopes\s*}}/g, withScopes.value ? scopes : '');

      // Replace placeholders
      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, camelCase(relatedModel.value))
        .replace(/{{\s*relatedModel\s*}}/g, relatedModel.value)
        .replace(/{{\s*foreignKey\s*}}/g, foreignKey.value)
        .replace(/{{\s*localKey\s*}}/g, localKey.value);

      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, HAS_ONE(relatedModel.value), finalOutput);
      }

      output.value = finalOutput;
    };

    watch(() => [
      ownerModel.value, 
      relatedModel.value, 
      localKey.value, 
      foreignKey.value, 
      namespace.value,
      asTrait.value,
      withScopes.value,
    ],       
      debounce(generateRelation, 300)
    );

    onMounted(async () => generateRelation());


    return {
      ownerModel,
      relatedModel,
      localKey,
      foreignKey,

      asTrait,
      withScopes,
      output,
      filename: HAS_ONE(ownerModel.value)
    };
  },
});
</script>

