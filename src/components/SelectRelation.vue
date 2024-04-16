<template>
    <v-col cols="12" md="6">
        <v-autocomplete 
            label="Select a Relationship" 
            :items="relationRoutes" 
            item-title="meta.name" 
            item-value="path"
            return-object
             v-model="selectedRelation" />
    </v-col>
</template>
<script lang="ts">
import { ref, watch, onMounted, defineComponent } from 'vue';
import { useRoute, RouteRecordNormalized } from 'vue-router';

export default defineComponent({
  props: {
    relationRoutes: {
      type: Array as () => RouteRecordNormalized[],
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedRelation = ref<RouteRecordNormalized | null>(null);
    const route = useRoute();

    watch(selectedRelation, (newValue) => {
      if (newValue && newValue.path) {
        emit('update:modelValue', newValue);
      }
    });

    onMounted(() => {
      if (props.relationRoutes.length > 0) {
        selectedRelation.value = props.relationRoutes.find((r: RouteRecordNormalized) => r.path === route.path) || props.relationRoutes[0];
      }
    });

    return {
      selectedRelation
    };
  }
});
</script>
