<template>
    <v-row>
        <v-col v-if="asTraitEnabled" cols="12" :md="md">
            <v-checkbox v-model="asTraitModel" label="As trait" />
        </v-col>
        <v-col v-if="withScopesEnabled" cols="12" :md="md">
            <v-checkbox v-model="withScopesModel" label="With scopes" />
        </v-col>
        <slot />
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
        asTraitEnabled: {
            type: Boolean,
            default: true,
        },
        withScopes: {
            type: Boolean,
            default: false,
        },
        withScopesEnabled: {
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