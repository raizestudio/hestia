<template>
  <div
    :class="
      clsx(
        'rounded-full transition-colors duration-300 ease-in-out',
        props.widthClass || 'w-4',
        props.heightClass || 'h-4',
        props.color || 'bg-success-100'
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  widthClass?: string;
  heightClass?: string;
  color?: string;
}>();
</script>
