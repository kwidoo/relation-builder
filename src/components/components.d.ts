declare module '@components' {
    import type { DefineComponent } from 'vue';

    interface ComponentProps {}
    interface ComponentEmits {}
    interface ComponentSlots {}

    const ModelInput: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    const KeyInput: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    const SelectRelation: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    const NamespaceInput: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    const LocalKey: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    const ForeignKey: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    const CodeComponent: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
    
    export { ModelInput, KeyInput, SelectRelation, NamespaceInput, LocalKey, ForeignKey, CodeComponent};
}
