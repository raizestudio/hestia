<template>
  <div
    :class="
      clsx(
        'rounded-full',
        props.backgroundColor || 'bg-primary-300',
        props.widthClass || 'w-10',
        props.heightClass || 'h-10',
        props.classes
      )
    "
  >
    <img
      v-if="props.src"
      :src="props.src"
      :alt="props.alt"
      :class="clsx('object-cover w-full h-full rounded-full')"
    />
    <span v-else class="flex justify-center items-center h-full">{{props.firstName[0]}}{{props.lastName[0]}}</span>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  src: string;
  alt: string;
  firstName: string;
  lastName: string;
  classes?: string;
  backgroundColor?: string;
  widthClass?: string;
  heightClass?: string;
}>();
</script>
