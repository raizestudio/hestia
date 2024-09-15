<template>
  <div class="relative flex items-center">
    <slot />
    <div
      v-if="props.show"
      :class="`absolute flex items-center justify-center px-2 py-1 text-gray-600 -translate-x-1/2 bg-dark-200 rounded-lg shadow-lg left-1/2 dark:shadow-none shadow-gray-200 dark:text-white ${props.widthClass || 'w-32'} ${props.tooltipOffsetClass || '-top-14'}`"
    >
      <span class=" text-xs z-10">{{ props.text }}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 absolute rotate-45 -translate-x-1/2 left-1/2 bottom-0.5 -mb-3 transform text-dark-200 fill-current"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  widthClass?: string;
  tooltipOffsetClass?: string;
  // toggleShow: () => void;
  text?: string;
}>();
</script>
