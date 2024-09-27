<template>
  <NuxtLayout>
    <div>
      <h1>{{ userStore.user.username }}</h1>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

// Stores
const userStore = useUserStore();
</script>