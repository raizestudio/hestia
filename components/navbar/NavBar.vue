<template>
  <nav
    :class="`flex items-center justify-between px-10 h-10 transition-colors duration-300 ease-in-out ${themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100'}`"
  >
    <div class="text-lg font-black">
      <span :class="`${themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'}`">Hestia</span>
    </div>
    <div @click="themeStore.toggleTheme">{{themeStore.current}}</div>
  </nav>
</template>

<script setup lang="ts">

const themeStore = useThemeStore();
</script>
