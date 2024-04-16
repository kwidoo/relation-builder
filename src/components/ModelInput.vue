<template>
    <v-col cols="12" :md="md">
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
        md: {
            type: String,
            required: false,
            default: '3',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const model: Ref<string> = ref('Post');

        watch(() => props.modelValue,
            () => {
                model.value = props.modelValue;
            }, { immediate: true });

        watch(() => model.value, (newValue: string) => {
            emit('update:modelValue', newValue);
        });

        return {
            model,
        };
    },
});
</script>