<template>
  <NuxtLayout>
    <div class="flex justify-center items-center grow">
      <span :class="`text-4xl font-semibold ${ themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'}`">WIP</span>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import packageJson from '@/package.json';

// Helpers
import { capitalize } from '~/utils/textHelper';

// Stores
const themeStore = useThemeStore();

definePageMeta({
  layout: 'landing',
});

useSeoMeta({
  title: `${capitalize(packageJson.name)} - Accueil`,
  description: 'This is the home page',
})
</script>