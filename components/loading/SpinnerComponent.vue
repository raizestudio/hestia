<template>
  <svg
    :class="`animate-spin ${props.widthClass || 'w-4'} ${
      props.heightClass || 'h-4'
    } ${props.svgClasses}`"
    viewBox="0 0 24 24"
  >
    <circle
      :class="`opacity-25 ${props.circleClasses}`"
      cx="12"
      cy="12"
      r="10"
      stroke-width="4"
    ></circle>
    <path
      :class="`opacity-75 fill-dark-300 ${props.pathClasses}`"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  svgClasses?: string;
  circleClasses?: string;
  pathClasses?: string;
  widthClass?: string;
  heightClass?: string;
}>();
</script>
