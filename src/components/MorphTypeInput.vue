<template>
    <v-col cols="12" :md="md">
        <v-text-field v-model="relationType" :label="label" outlined dense></v-text-field>
    </v-col>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from 'vue';
import { snakeCase } from 'lodash';

export default defineComponent({
    name: 'PolymorphicRelationInput',
    props: {
        label: {
            type: String,
            required: false,
            default: 'Relation Type',
        },
        modelName: {
            type: String,
            required: true,
            default: 'Post',
        },
        modelValue: {
            type: String,
            required: false,
            default: '',
        },
        md: {
            type: String,
            required: false,
            default: '3',
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const relationType: Ref<string> = ref(props.modelValue || '');

        const defaultRelationType = computed(() => {
            return props.modelName ? `${snakeCase(props.modelName)}able` : '';
        });

        watch(() => props.modelValue, (newVal) => {
            relationType.value = newVal || defaultRelationType.value;
        }, { immediate: true });

        watch(() => props.modelName, () => {
            if (!props.modelValue) {
                relationType.value = defaultRelationType.value;
            }
        }, { immediate: true });

        watch(relationType, (newValue) => {
            emit('update:modelValue', newValue);
        });

        return {
            relationType,
        };
    },
});
</script>
