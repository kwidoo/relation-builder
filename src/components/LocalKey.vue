<template>
    <v-col cols="12" :md="md">
        <v-text-field v-model="localKey" :label="label" outlined dense></v-text-field>
    </v-col>

</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue';

export default defineComponent({
    name: 'LocalKey',
    props: {
        label: {
            type: String,
            required: false,
            default: 'Local Key',
        },
        modelValue: {
            type: String,
            required: true,
            default: 'id',
        },
        md: {
            type: String,
            required: false,
            default: '3',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const localKey: Ref<string> = ref('id');

        watch(() => props.modelValue,
            () => {
                localKey.value = props.modelValue;
            }, { immediate: true });

        watch(() => localKey.value, (newValue: string) => {
            emit('update:modelValue', newValue);
        });

        return {
            localKey,
        };
    },
});
</script>