<template>
  <div :class="`rounded-full ${props.widthClass || 'w-4'} ${props.heightClass || 'h-4'} ${props.color || 'bg-success-100'}`">
    <slot />
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  widthClass?: string;
  heightClass?: string;
  color?: string;
}>();
</script>