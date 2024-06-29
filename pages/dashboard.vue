<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
  // description: 'Dashboard page',
  // image: '/images/dashboard.png',
  // url: 'https://example.com/dashboard',
  middleware: 'auth',

})
</script>

<template>
  <NuxtLayout>
    <div>Dash</div>
  </NuxtLayout>
</template>