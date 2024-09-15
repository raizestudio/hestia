<template>
  <div class="w-full">
    <div
      :class="
        clsx(
          'w-full bg-primary-300 overflow-hidden',
          props.heightClass || 'h-1.5'
        )
      "
    >
      <div
        class="animate-progress w-full h-full bg-primary-100 left-right rounded-full"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<{
  heightClass?: string;
}>();
</script>
