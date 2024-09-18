<template>
  <div
    :class="
      clsx('', themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200')
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();
</script>
