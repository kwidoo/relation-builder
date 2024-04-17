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
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { ForeignKey, LocalKey, ModelInput, CodeComponent, OptionsBar } from '@components';
import { debounce, camelCase } from 'lodash';
import pluralize from 'pluralize';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';

export default defineComponent({
  name: 'HasManyRelationBuilder',
  components: {
    ForeignKey,
    LocalKey,
    ModelInput,
    CodeComponent,
    OptionsBar,
  },
  setup() {
    const appStore = useAppStore();
    const { HAS_MANY, hasManyStub, hasManyScopes } = useConstants();
    let output = ref('');

    const ownerModel = ref('User');
    const relatedModel = ref('Post'); // Pluralize to indicate multiple possible entities
    const localKey = ref('id');
    const foreignKey = ref('user_id');
    const asTrait = ref(true);
    const withScopes = ref(false);

    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await hasManyStub();
      let finalOutput = initialStub.replace(/{{\s*scopes\s*}}/g, withScopes.value ? await hasManyScopes() : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, pluralize(camelCase(relatedModel.value)))
        .replace(/{{\s*relatedModel\s*}}/g, relatedModel.value)
        .replace(/{{\s*foreignKey\s*}}/g, foreignKey.value)
        .replace(/{{\s*localKey\s*}}/g, localKey.value);

      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, HAS_MANY(relatedModel.value), finalOutput);
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
    ], debounce(generateRelation, 300));

    onMounted(generateRelation);

    return {
      ownerModel,
      relatedModel,
      localKey,
      foreignKey,
      asTrait,
      withScopes,
      output,
      filename: HAS_MANY(ownerModel.value) // Filename reflects the "Has Many" nature
    };
  },
});
</script>
