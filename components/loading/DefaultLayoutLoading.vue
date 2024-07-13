<template>
  <div class="flex flex-col justify-center items-center h-screen grow gap-4">
    <span class="loading loading-ring loading-lg"></span>
    <span class="text-xl font-bold">{{coreStore.loadingMessage}}</span>
  </div>
</template>

<script setup lang="ts">

const coreStore = useCoreStore()
</script>