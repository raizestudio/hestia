<template>
  <button
    :class="`px-4 py-1 rounded-md transition-colors duration-500 ease-in-out ${
      themeStore.current === 'light' ? 'text-dark-200 bg-light-100 hover:bg-light-300' : 'text-light-200 bg-dark-100 hover:bg-dark-300'
    }`"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">

// Stores
const themeStore = useThemeStore();
</script>