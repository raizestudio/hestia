<template>
  <div :class="`flex items-center px-1.5 py-1 rounded ${badgeBackground}`">
    <span
      :class="`font-semibold text-xs ${
        themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
      }`"
    >
      {{ props.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Stores
const themeStore = useThemeStore();

const badgeBackground = computed(() => {
  if (props.color) {
    return `bg-${props.color}-100`;
  }
  return themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100';
});
const props = defineProps<{
  text: string;
  extraClasses?: string;
  color?: string;
}>();
</script>
