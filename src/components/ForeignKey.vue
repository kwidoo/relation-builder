<template>
    <v-col cols="12" md="3">
        <v-text-field v-model="foreignKey" :label="label" outlined dense></v-text-field>
    </v-col>
</template>
<script lang="ts">
import { computed } from 'vue';
import { defineComponent, Ref, ref, watch } from 'vue';
import _ from 'lodash';

export default defineComponent({
    name: 'ForeignKey',
    props: {
        label: {
            type: String,
            required: false,
            default: 'Foreign Key',
        },
        modelName: {
            type: String,
            required: true,
            default: 'Post',
        },
        modelValue: {
            type: String,
            required: true,
            default: 'post_id',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const foreignKey: Ref<string> = ref('post_id');

        const model = computed(() => {
            return props.modelName ? _.snakeCase(props.modelName) : '';
        })

        const value = computed(() => props.modelValue ? _.snakeCase(props.modelValue) : '')

        watch(() => props.modelName,
            () => {
                foreignKey.value = props.modelName ? `${model.value}_id` : '';
            }, { immediate: true });

        watch(() => props.modelValue,
            () => {
                foreignKey.value = props.modelValue ? `${value.value}` : '';
            }, { immediate: true });

        watch(() => foreignKey.value, (newValue) => {
            emit('update:modelValue', newValue);
        });
        return {
            foreignKey,
        };
    },
});
</script>