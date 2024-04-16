<template>
  <v-col cols="12" md="6">
    <v-combobox v-model="namespace" :items="namespaces" label="Namespace" outlined dense clearable />
  </v-col>
</template>

<script lang="ts">
import { Ref } from 'vue';
import { ref, defineComponent, watch, onMounted } from 'vue';

export default defineComponent({
  name: 'NamespaceInput',

  props: {
    modelValue: {
      type: String,
      required: true,
      default: 'App\\Models\\',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const namespace: Ref<string> = ref('App\\Models\\');
    const namespaces: Ref<string[]>= ref(['App\\Models\\', 'App\\']);

    onMounted(() => {
      namespace.value = props.modelValue;
    });
    watch(() => namespace.value, (newValue: string) => {
      if (!newValue.endsWith('\\')) {
        newValue = `${newValue}`;
      }
      emit('update:modelValue', newValue);
    });
    return {
      namespace,
      namespaces,
    };
  }
});
</script>