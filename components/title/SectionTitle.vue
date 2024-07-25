<template>
  <div class="grow">
    <h2 class="text-2xl font-bold select-none">{{ props.title }}</h2>
    <p class="text-sm opacity-50 select-none">{{ props.description }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
}>();
</script>
