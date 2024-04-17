<template>
    <v-row>
        <v-col cols="12" :md="md">
        <v-checkbox v-model="asTraitModel" label="As trait"></v-checkbox>
        </v-col>
        <v-col cols="12" :md="md">
        <v-checkbox v-model="withScopesModel" label="With scopes"></v-checkbox>
        </v-col>
    </v-row>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue';

export default defineComponent({
    props: {
        md: {
            type: String,
            default: '4',
        },
        asTrait: {
            type: Boolean,
            default: false,
        },
        withScopes: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['update:asTrait', 'update:withScopes'],

    setup(props, { emit }) {
        const asTraitModel: Ref<boolean> = ref(props.asTrait);
        const withScopesModel: Ref<boolean> = ref(props.withScopes);

        watch(
            ()=> asTraitModel.value,
            (newValue: boolean) => {
                emit('update:asTrait', newValue);
            },
        );

        watch(
            ()=> withScopesModel.value,
            (newValue: boolean) => {
                emit('update:withScopes', newValue);
            },
        );

        watch(
            () => props.asTrait,
            (newValue: boolean) => {
                asTraitModel.value = newValue;
            },
        );

        watch(
            () => props.withScopes,
            (newValue: boolean) => {
                withScopesModel.value = newValue;
            },
        );

        return {
            asTraitModel,
            withScopesModel,
        };
    },
});
</script>