<template>
  <h2
    :class="
      clsx(
        'font-semibold text-xl',
        themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
      )
    "
  >
    {{ props.title }}
  </h2>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  title: string;
}>();
</script>
