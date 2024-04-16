declare module '@relations' {
    import type { DefineComponent } from 'vue';

    interface ComponentProps {}
    interface ComponentEmits {}
    interface ComponentSlots {}

    export const FilesBelongsTo: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const BelongsToMany: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const HasMany: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const HasManyThrough: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const HasOne: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const HasOneThrough: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const MorphedByMany: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const MorphMany: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const MorphOne: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const MorphTo: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    export const MorphToMany: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
}
