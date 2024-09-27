<template>
  {{ props.label }}
  <slot />
</template>

<script setup lang="ts">

const props = defineProps<{
  label?: string;
}>();
</script>
