<template>
  <span v-if="description" class="text-nowrap">{{ description.length > 20 ? description.slice(0, 20) + '...' : description }} </span>
  <ExclamationCircle
    v-else
    class="stroke-warning"
  />
</template>

<script setup lang="ts">

const props = defineProps<{
  description: string;
}>();
</script>
