<template>
    <v-col cols="12" md="3">
        <v-text-field v-model="model" :label="label" outlined dense></v-text-field>
    </v-col>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';

export default defineComponent({
    name: 'ModelInput',
    props: {
        modelValue: {
            type: String,
            required: true,
            default: 'Post',
        },
        label: {
            type: String,
            required: true,
            default: 'Model Name',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const model: Ref<string> = ref('Post');

        watch(() => props.modelValue,
            () => {
                model.value = props.modelValue;
            }, { immediate: true });

        watch(() => model.value, (newValue) => {
            emit('update:modelValue', newValue);
        });

        return {
            model,
        };
    },
});
</script>