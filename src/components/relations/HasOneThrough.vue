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
              <foreign-key v-model="throughModelForeignKey" :modelName="intermediaryModel" label="Foreign key" md="2"/>
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
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { ForeignKey, LocalKey, ModelInput, CodeComponent, OptionsBar } from '@components';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';

export default defineComponent({
  name: 'HasOneThroughRelationBuilder',
  components: {
    ForeignKey,
    LocalKey,
    ModelInput,
    CodeComponent,
    OptionsBar,
  },
  setup() {
    const appStore = useAppStore();
    const { HAS_ONE_THROUGH, hasOneThroughStub, hasOneThroughScopes } = useConstants();
    let output = ref('');

    const ownerModel = ref('Country');
    const intermediaryModel = ref('User');
    const finalModel = ref('Post');

    const ownerModelLocalKey = ref('id');
    const throughModelLocalKey = ref('id');

    const throughModelForeignKey = ref('country_id');
    const finalModelForeignKey = ref('user_id');

    const asTrait = ref(true);
    const withScopes = ref(false);
    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await hasOneThroughStub();
      let finalOutput = initialStub.replace(/{{\s*scopes\s*}}/g, withScopes.value ? await hasOneThroughScopes() : '');

      finalOutput = finalOutput
        .replace(/{{\s*methodName\s*}}/g, camelCase(finalModel.value))
        .replace(/{{\s*relatedModel\s*}}/g, finalModel.value)
        .replace(/{{\s*throughModel\s*}}/g, intermediaryModel.value)
        .replace(/{{\s*firstKey\s*}}/g, throughModelForeignKey.value)
        .replace(/{{\s*secondKey\s*}}/g, finalModelForeignKey.value)
        .replace(/{{\s*localKey\s*}}/g, ownerModelLocalKey.value)
        .replace(/{{\s*throughKey\s*}}/g, throughModelLocalKey.value);
      
      if (asTrait.value) {
        const { trait } = await useAsTrait();
        finalOutput = trait(namespace.value, HAS_ONE_THROUGH(ownerModel.value), finalOutput);
      }

      output.value = finalOutput;
    };

    watch(() => [
      ownerModel.value,
      intermediaryModel.value,
      finalModel.value,
      ownerModelLocalKey.value,
      throughModelLocalKey.value,
      throughModelForeignKey.value,
      finalModelForeignKey.value,
      namespace.value,
      asTrait.value,
      withScopes.value,
    ], debounce(generateRelation, 300));

    onMounted(generateRelation);

    return {
      ownerModel,
      intermediaryModel,
      finalModel,
      ownerModelLocalKey,
      throughModelLocalKey,
      throughModelForeignKey,
      finalModelForeignKey,
      output,
      asTrait,
      withScopes,
      filename: HAS_ONE_THROUGH(ownerModel.value) // Adjust filename for "Has One Through"
    };
  },
});
</script>
