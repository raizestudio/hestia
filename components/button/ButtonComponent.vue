<template>
  <button
    :class="
      clsx(
        'transition-colors duration-300 ease-in-out active:duration-0  active:text-light-100',
        themeStore.current === 'light' ? 'text-dark-200 bg-light-100 hover:bg-light-300 active:bg-primary-100' : 'text-light-200 bg-dark-100 hover:bg-dark-300 active:bg-primary-300 disabled:!bg-none',
        props.isDisabled ? themeStore.current === 'light' ? 'cursor-not-allowed hover:!bg-light-200 active:!bg-light-200' : 'cursor-not-allowed hover:!bg-dark-200 active:!bg-dark-200' : 'cursor-pointer',
        props.radiusClass || 'rounded',
        props.paddingClass || 'px-3 py-0.5',
        props.extraClasses
      )
    "
    :disabled="props.isDisabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  paddingClass?: string;
  radiusClass?: string;
  extraClasses?: string;
  isDisabled?: boolean;
}>();
</script>
