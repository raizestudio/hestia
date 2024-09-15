<template>
  <button
    :class="
      clsx(
        'px-3 py-0.5 rounded-md transition-colors duration-300 ease-in-out active:duration-0  active:text-light-100',
        themeStore.current === 'light' ? 'text-dark-200 bg-light-100 hover:bg-light-300 active:bg-primary-100' : 'text-light-200 bg-dark-100 hover:bg-dark-300 active:bg-primary-300',
        props.extraClasses
      )
    "
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  extraClasses?: string;
}>();
</script>
