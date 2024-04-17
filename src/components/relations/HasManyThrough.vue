<template>
  <v-container>
    <v-form>
      <v-container fluid class="px-0">
        <v-row justify="space-between">
          <model-input v-model="ownerModel" label="Owner model" md="4"/>
          <model-input v-model="finalModel" label="Final model" md="4"/>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-row>
            <local-key v-model="ownerModelLocalKey" label="Local key" md="2"/>
            <foreign-key v-model="througModleForeignKey" :modelName="intermediaryModel" label="Foreign key" md="2"/>
            <model-input v-model="intermediaryModel" label="Through model" md="4"/>
            <local-key v-model="throughModelLocalKey" label="Local key" md="2"/>
            <foreign-key v-model="finalModelForeignKey" :modelName="finalModel" label="Foreign key" md="2"/>
            </v-row>  
          </v-col>
        </v-row>
        <options-bar v-model:asTrait="asTrait" v-model:withScopes="withScopes" md="4"/>
      </v-container>
    </v-form>
    <code-component :codeText="output" :filename="filename" />
  </v-container>
</template>
<script lang="ts">
import { debounce, camelCase } from 'lodash';
import pluralize from 'pluralize';
import { defineComponent, ref, Ref, onMounted, watch, computed } from 'vue';
import { ForeignKey, LocalKey, ModelInput, CodeComponent, OptionsBar } from '@components';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';

export default defineComponent({
  name: 'HasManyThroughRelationBuilder',
  components: {
    ForeignKey,
    LocalKey,
    ModelInput,
    CodeComponent,
    OptionsBar,
  },
  setup() {
    const appStore = useAppStore();
    const { HAS_MANY_THROUGH, hasManyThroughStub, hasManyThroughScopes } = useConstants();
    let output: Ref<string> = ref('');

    const ownerModel: Ref<string> = ref('Country');
    const intermediaryModel: Ref<string> = ref('User');
    const finalModel: Ref<string> = ref('Post');

    const ownerModelLocalKey: Ref<string> = ref('id');
    const throughModelLocalKey: Ref<string> = ref('id');

    const througModleForeignKey: Ref<string> = ref('country_id');
    const finalModelForeignKey: Ref<string> = ref('user_id');

    const asTrait: Ref<boolean> = ref(true);
    const withScopes: Ref<boolean> = ref(false);
    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';  

      const initialStub = await hasManyThroughStub(); 
      let finalOutput = initialStub; 

      let scopes = await hasManyThroughScopes();
      finalOutput = finalOutput.replace(/{{\s*scopes\s*}}/g, withScopes.value ? scopes : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, pluralize(camelCase(finalModel.value)))
        .replace(/{{\s*relatedModel\s*}}/g, finalModel.value)
        .replace(/{{\s*throughModel\s*}}/g, intermediaryModel.value)
        .replace(/{{\s*firstKey\s*}}/g, througModleForeignKey.value)
        .replace(/{{\s*secondKey\s*}}/g, finalModelForeignKey.value)
        .replace(/{{\s*localKey\s*}}/g, ownerModelLocalKey.value)
        .replace(/{{\s*throughKey\s*}}/g, throughModelLocalKey.value);
      
      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, HAS_MANY_THROUGH(ownerModel.value), finalOutput);
      }

      output.value = finalOutput;  // Set output to the completely processed text
    };

    watch(() => [
      ownerModel.value,
      intermediaryModel.value,
      finalModel.value,
      ownerModelLocalKey.value,
      throughModelLocalKey.value,
      througModleForeignKey.value,
      finalModelForeignKey.value,
      namespace.value,
      asTrait.value,
      withScopes.value,
    ], debounce(generateRelation, 300));

    onMounted(async () => generateRelation());

    return {
      ownerModel,
      intermediaryModel,
      finalModel,
      ownerModelLocalKey,
      finalModelForeignKey,
      througModleForeignKey,
      throughModelLocalKey,
      output,
      asTrait,
      withScopes,
      filename: HAS_MANY_THROUGH(ownerModel.value)
    };
  },
});
</script>
