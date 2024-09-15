<template>
  <NuxtLayout>
    <div :class="clsx('h-full', themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100')">
      Dashboard
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from 'clsx';
import packageJson from '@/package.json';

// Stores
const themeStore = useThemeStore();

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: `${packageJson.name} - Dashboard`,
})
</script>