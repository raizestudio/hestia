<template>
  <div :class="`flex flex-col h-screen transition-colors duration-700 ease-in-out ${ themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100'}`">
    <NavBar />
    <div class="grow">
      <slot />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">

// Components
import NavBar from '~/components/navbar/NavBar.vue';
import FooterComponent from '~/components/footer/FooterComponent.vue';

// Stores
const themeStore = useThemeStore()
</script>