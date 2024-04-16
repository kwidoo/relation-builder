<template>
    <v-col cols="12" :md="md">
        <v-text-field v-model="pivotTable" :label="label" outlined dense></v-text-field>
    </v-col>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue';
import { snakeCase } from 'lodash';

export default defineComponent({
    name: 'PivotTableInput',
    props: {
        label: {
            type: String,
            required: false,
            default: 'Pivot Key',
        },
        modelName1: {
            type: String,
            required: true,
            default: 'ModelOne',
        },
        modelName2: {
            type: String,
            required: true,
            default: 'ModelTwo',
        },
        modelValue: {
            type: String,
            required: true,
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
        const pivotTable: Ref<string> = ref('');

        const model1 = computed((): string => snakeCase(props.modelName1));
        const model2 = computed((): string => snakeCase(props.modelName2));

        const generatePivotKey = (): string => {
            if (props.modelName1 && props.modelName2) {
                return `${model1.value}_${model2.value}`;
            }
            return '';
        };

        watch([model1, model2], () => {
            pivotTable.value = generatePivotKey();
        }, { immediate: true });

        watch(() => props.modelValue, (newVal: string) => {
            pivotTable.value = newVal ? snakeCase(newVal) : generatePivotKey();
        }, { immediate: true });

        watch(() => pivotTable.value, (newValue: string) => {
            emit('update:modelValue', newValue);
        });

        return {
            pivotTable,
        };
    },
});
</script>
