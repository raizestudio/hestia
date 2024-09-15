// @/types/vueuse.d.ts

declare module '@vueuse/components' {
  export * from '@vueuse/components'
  import { Directive } from 'vue';
  export const vOnClickOutside: Directive; 
}