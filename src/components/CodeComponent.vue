<template>
    <div class="code">
      <v-snackbar v-model="snackbarVisible" timeout="3000" :right="true" :top="true" color="info">
        Code copied to clipboard!
      </v-snackbar>
      <v-row justify="end">
        <v-col cols="auto"> 
            <v-btn variant="text" @click="copyCode" icon="mdi-content-copy" />
            <v-btn variant="text" @click="asFile" icon="mdi-cloud-download-outline" />
        </v-col>
      </v-row>
      <pre><code v-html="code" class="hljs" /></pre>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import { useHighlight } from '@composables';
import { useClipboard } from '@vueuse/core';  // Import useClipboard

export default defineComponent({
  name: 'CodeComponent',
  props: {
    filename: {
        type: String,
        required: false,
        default: '',
    },
    codeText: {
        type: String,
        required: true,
        default: '',
    },
  },

  setup(props) {
    const snackbarVisible:Ref<boolean> = ref(false);
    const { highlight } = useHighlight();
    const { copy, copied } = useClipboard(); 
    
    const code = computed(() => highlight(props.codeText));

    const copyCode = (): void => {
      copy(props.codeText);
      snackbarVisible.value = true;
    };

    const asFile = (): void => {
        const blob = new Blob([props.codeText], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${props.filename}.php`; 
        document.body.appendChild(link);
        link.click();  
        document.body.removeChild(link);  
    }

    return {
        code,
        copied,
        snackbarVisible,

        copyCode,
        asFile
       };
    },
});
</script>
<style>
.code {
  padding: 15px;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #fff), var(--tw-ring-shadow, 0 0 #fff), var(--tw-shadow);
}
</style>
