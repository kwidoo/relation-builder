<template>
  <v-container>
    <v-form v-if="false">
      <v-container fluid class="px-0">
        <v-row justify="center">
          <morph-id-input v-model="morphId" label="Morph ID" md="4"/>
          <morph-type-input v-model="morphType" label="Morph Type" md="4"/>
        </v-row>
        <options-bar v-model:asTrait="asTrait" v-model:withScopes="withScopes" md="4"/>
      </v-container>
    </v-form>
    <code-component v-if="false"
    :codeText="output" :filename="filename" />
    <h1>Not Implemented</h1>
  </v-container>
</template>

<script lang="ts">
import { debounce } from 'lodash';
import { defineComponent, ref, onMounted, watch, computed } from 'vue';
import { CodeComponent, OptionsBar } from '@components';
import { useAppStore } from '@/store/app';
import { useAsTrait, useConstants } from '@composables';

export default defineComponent({
  name: 'MorphToRelationBuilder',
  components: {
    CodeComponent,
    OptionsBar,

  },
  setup() {
    const appStore = useAppStore();
    const { MORPH_TO, morphToStub, morphToScopes } = useConstants();
    let output = ref('');

    const morphId = ref(''); // Identifier for the polymorphic relation
    const morphType = ref(''); // Type for the polymorphic relation

    const asTrait = ref(true);
    const withScopes = ref(false);
    const namespace = computed(() => appStore.getNamespace);

    const generateRelation = async () => {
      output.value = '';

      const initialStub = await morphToStub();
      let finalOutput = initialStub.replace(/{{\s*scopes\s*}}/g, withScopes.value ? await morphToScopes() : '');

      finalOutput = finalOutput
        .replace(/{{\s*morphId\s*}}/g, morphId.value)
        .replace(/{{\s*morphType\s*}}/g, morphType.value);
      
      if (asTrait.value) {
        const { trait } = await useAsTrait();
         finalOutput = trait(namespace.value, 'tags', finalOutput);
      }

      output.value = finalOutput;
    };

    watch(() => [
      morphId.value,
      morphType.value,
      namespace.value,
      asTrait.value,
      withScopes.value,
    ], debounce(generateRelation, 300));

    onMounted(generateRelation);

    return {
      morphId,
      morphType,
      output,
      asTrait,
      withScopes,
      filename: 'MorphToRelation' // Generic filename as the specific model isn't known
    };
  },
});
</script>
