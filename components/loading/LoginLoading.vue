<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <span class="loading loading-ring loading-lg"></span>
    <span class="text-2xl font-semibold">{{message}}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
}>();
</script>