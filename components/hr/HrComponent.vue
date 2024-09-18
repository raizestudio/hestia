<template>
  <hr
    :class="
      clsx(
        '',
        themeStore.current === 'light' ? 'border-light-300' : 'border-dark-300'
      )
    "
  />
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();
</script>
