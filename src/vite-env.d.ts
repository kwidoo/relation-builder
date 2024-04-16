/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  interface ComponentProps {}
  interface ComponentEmits {}
  interface ComponentSlots {}

  const component: DefineComponent<ComponentProps, ComponentEmits, ComponentSlots>;
  export default component;
}
