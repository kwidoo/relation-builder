<template>
  <v-container class="px-0">
    <v-row>
      <select-relation v-model="selectedRelation" :relationRoutes="relationRoutes"/>
      <namespace-input v-model="namespace" />
    </v-row>
    <router-view class="px-0" />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';
import { useRouter, RouteRecordNormalized } from 'vue-router';
import { NamespaceInput, SelectRelation } from '@components';
import { useAppStore } from '@/store/app';

export default defineComponent({
  name: 'Relations',
  components: {
    NamespaceInput,
    SelectRelation,
  },
  setup() {
    const router = useRouter();
    const appStore = useAppStore();
    const selectedRelation: Ref<RouteRecordNormalized | null | undefined> = ref(null);
    const namespace: Ref<string> = ref('App\\Models\\');

    const relationRoutes = router.getRoutes().filter(route => route.meta && route.meta.name);

    watch(selectedRelation, (newValue) => {
      if (newValue && newValue.name) {
        router.push({ name: newValue.name });
      }
    });

    watch(namespace, (newValue) => {
      appStore.setNamespace(newValue);
    });

    return {
      relationRoutes,
      selectedRelation,
      namespace,
    };
  }
});
</script>
