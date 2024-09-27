<template>
  <div class="flex gap-2">
    <div v-for="tag in props.tags" :key="tag.id" class="rounded-sm" :style="`background-color: ${tag.color}`">
      <span class="text-xs text-info-content text-nowrap px-1 py-0.5">{{ tag.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { TagInterface } from '~/interfaces/TagInterface';

const props = defineProps<{
  tags: TagInterface[];
}>();
</script>
