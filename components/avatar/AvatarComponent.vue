<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :class="
      clsx(
        'rounded-full',
        props.backgroundColor || 'bg-primary-300',
        props.widthClass || 'w-10',
        props.heightClass || 'h-10',
        props.classes
      )
    "
  />
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  src: string;
  alt: string;
  classes?: string;
  backgroundColor?: string;
  widthClass?: string;
  heightClass?: string;
}>();
</script>
