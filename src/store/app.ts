// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    namespace: 'App\\Models', 
  }),
  getters: {
    getNamespace(state) {
      return state.namespace;
    }
  },
  actions: {
    setNamespace(newNamespace: string) {
      this.namespace = newNamespace;
    },
    resetNamespace() {
      this.namespace = 'App\\Models'; // Reset to default or another appropriate value
    }
  }
})
