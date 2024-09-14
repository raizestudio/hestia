<template>
  <div>
    <div :class="`cursor-pointer rounded-full p-1 ${themeStore.current === 'light' ? 'hover:bg-light-300' : 'hover:bg-dark-300'}`" @click="themeStore.toggleTheme">
      <SunIcon v-if="themeStore.current === 'dark'" class="w-6" ball-classes="fill-yellow-300" rays-classes="fill-yellow-500"  />
      <MoonIcon v-else class="w-6 fill-dark-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Stores
const themeStore = useThemeStore();

// Icons
import SunIcon from '~/components/icons/SunIcon.vue';
import MoonIcon from '~/components/icons/MoonIcon.vue';

</script>