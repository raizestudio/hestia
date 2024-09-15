<template>
  <div :class="`flex flex-col h-screen transition-colors duration-700 ease-in-out ${ themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100'}`">
    <NavBar />
    <div class="flex grow">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

// Components
import NavBar from '@/components/navbar/NavBar.vue';

// Stores
const themeStore = useThemeStore()
</script>