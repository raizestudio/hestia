<template>
  <NuxtLayout>
    <div class="h-full bg-green-400">
      Dashboard
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import packageJson from '@/package.json';

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: `${packageJson.name} - Dashboard`,
})
</script>