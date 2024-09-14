<template>
  <NuxtLayout>
    <div class="flex justify-center items-center px-10 py-4 h-full">
      <div :class="`w-2/6 rounded ${ themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-300'}`">
        <span>Login</span>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

// Stores
const themeStore = useThemeStore()

definePageMeta({
})

useSeoMeta({
  title: 'Home',
  description: 'This is the home page',
})
</script>