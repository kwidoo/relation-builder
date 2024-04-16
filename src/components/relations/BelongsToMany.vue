<template>
  <v-container>
    <v-form>
      <v-container fluid class="px-0">
        <v-row justify="space-between">
          <model-input v-model="ownerModel" label="Related model" md="4"/>
          <model-input v-model="relatedModel" label="Model" md="4"/>
        </v-row>
        <v-row justify="center">
          <local-key v-model="ownerModelLocalKey" label="Local key" md="2"/>
          <foreign-key v-model="pivotForeignKeyOwner" :modelName="relatedModel" label="Pivot key"  md="2"/>
          <pivot-table-input v-model="pivotTable" :model-name1="ownerModel" :model-name2="relatedModel" label="Pivot table" md="2"/>
          <foreign-key v-model="pivotForeignKeyRelated" :modelName="ownerModel" label="Pivot key"  md="2"/>
          <local-key v-model="relatedModelLocalKey" label="Local key" md="2"/>
        </v-row>

        <v-row>
          <v-col cols="12" md="4">
            <v-checkbox v-model="asTrait" label="As trait"></v-checkbox>
          </v-col>
          <v-col cols="12" md="4">
            <v-checkbox v-model="withScopes" label="With scopes"></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <code-component :codeText="output" :filename="filename" />
  </v-container>
</template>

<script lang="ts">
import { debounce, camelCase } from 'lodash';
import pluralize from 'pluralize';
import { defineComponent, ref, Ref, onMounted, watch, computed } from 'vue';
import { ForeignKey, LocalKey, ModelInput, CodeComponent, PivotTableInput } from '@components';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';

export default defineComponent({
  name: 'BelongsToManyRelationBuilder',
  components: {
    ForeignKey,
    LocalKey,
    ModelInput,
    CodeComponent,
    PivotTableInput,
  },
  setup() {
    const appStore = useAppStore();
    const { BELONGS_TO_MANY, belongsToManyStub, belongsToManyScopes } = useConstants();
    let output: Ref<string> = ref('');

    const ownerModel: Ref<string> = ref('Post');
    const relatedModel: Ref<string> = ref('User');
    const pivotTable: Ref<string> = ref('post_user');

    const ownerModelLocalKey: Ref<string> = ref('id');
    const relatedModelLocalKey: Ref<string> = ref('id');

    const pivotForeignKeyOwner: Ref<string> = ref('post_id');
    const pivotForeignKeyRelated: Ref<string> = ref('user_id');

    const asTrait: Ref<boolean> = ref(true);
    const withScopes: Ref<boolean> = ref(false);

    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';  // Reset output at the start of the function call

      const initialStub = await belongsToManyStub();
      let finalOutput = initialStub; // Use a local variable to build the final output

      let scopes = await belongsToManyScopes();
      finalOutput = finalOutput.replace(/{{\s*scopes\s*}}/g, withScopes.value ? scopes : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, pluralize(camelCase(relatedModel.value)))
        .replace(/{{\s*relatedModel\s*}}/g, relatedModel.value)
        .replace(/{{\s*relatedKey\s*}}/g, ownerModelLocalKey.value)
        .replace(/{{\s*relatedPivotKey\s*}}/g, pivotForeignKeyOwner.value)
        .replace(/{{\s*parentKey\s*}}/g, relatedModelLocalKey.value)
        .replace(/{{\s*foreignPivotKey\s*}}/g, pivotForeignKeyRelated.value)
        .replace(/{{\s*pivotTable\s*}}/g, pivotTable.value);

      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, BELONGS_TO_MANY(ownerModel.value), finalOutput);
      }

      output.value = finalOutput;  // Set output to the completely processed text
    };

    watch(() => [
      ownerModel.value,
      relatedModel.value,
      ownerModelLocalKey.value,
      relatedModelLocalKey.value,
      pivotForeignKeyOwner.value,
      pivotForeignKeyRelated.value,
      namespace.value,
      asTrait.value,
      withScopes.value,
      pivotTable.value,
    ], debounce(generateRelation, 300));

    onMounted(async () => generateRelation());

    return {
      ownerModel,
      relatedModel,
      pivotTable,
      ownerModelLocalKey,
      relatedModelLocalKey,
      pivotForeignKeyOwner,
      pivotForeignKeyRelated,
      asTrait,
      withScopes,
      output,
      filename: BELONGS_TO_MANY(ownerModel.value)
    };
  },
});
</script>

