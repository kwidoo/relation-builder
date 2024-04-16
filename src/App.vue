<template>
  <v-app>
    <v-main class="px-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Relations Helper',
  setup() {
    return {
      //
    };
  },
});
</script>
