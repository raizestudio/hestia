<template>
  <div class="flex justify-center gap-1 w-full">
    <span class="flex justify-start text-md font-semibold text-content text-nowrap">{{ props.label }}:</span>
    <div class="bg-base-300 px-2 py-0 rounded-sm">
      <span class="text-md font-semibold text-content">
        {{ props.value }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  label: string;
  value: string;
}>();
</script>
