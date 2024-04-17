<template>
  <v-container>
    <v-form>
      <v-container fluid class="px-0">
        <v-row align="center">
          <model-input v-model="relatedModel" label="Related model" />
          <foreign-key v-model="localKey" :modelName="ownerModel" label="Local key" />
          <local-key v-model="foreignKey" label="Foreign key" />
          <model-input v-model="ownerModel" label="Model" />
        </v-row>

        <options-bar v-model:asTrait="asTrait" v-model:withScopes="withScopes" md="4"/>

      </v-container>
    </v-form>
    <code-component :codeText="output" :filename="filename" />
  </v-container>
</template>

<script lang="ts">
import { debounce, camelCase } from 'lodash';
import { defineComponent, ref, Ref, onMounted, watch, computed } from 'vue';
import { ForeignKey, LocalKey, ModelInput, CodeComponent,    OptionsBar,
 } from '@components';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';


export default defineComponent({
  name: 'BelongsToRelationBuilder',
  components: {
    ForeignKey,
    LocalKey,
    ModelInput,
    CodeComponent,
    OptionsBar,

  },
  setup() {
    const appStore = useAppStore();
    const { BELONGS_TO, belongsToStub, belongsToScopes } = useConstants();
    let output: Ref<string> = ref('');

    const ownerModel: Ref<string> = ref('User');
    const relatedModel: Ref<string> = ref('Post');
    const localKey: Ref<string> = ref('user_id');
    const foreignKey: Ref<string> = ref('id');
    const asTrait: Ref<boolean> = ref(true);
    const withScopes: Ref<boolean> = ref(false);

    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await belongsToStub();
      let finalOutput = initialStub; 

      let scopes = await belongsToScopes();
      finalOutput = finalOutput.replace(/{{\s*scopes\s*}}/g, withScopes.value ? scopes : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, camelCase(ownerModel.value))
        .replace(/{{\s*ownerModel\s*}}/g, ownerModel.value)
        .replace(/{{\s*foreignKey\s*}}/g, localKey.value)
        .replace(/{{\s*localKey\s*}}/g, foreignKey.value);

      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, BELONGS_TO(ownerModel.value), finalOutput);
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
      filename: BELONGS_TO(ownerModel.value)
    };
  },
});
</script>
