<template>
  <div class="inline-flex items-center">
    <label class="flex justify-center items-center cursor-pointer relative">
      <input
        type="checkbox"
        :class="
          clsx(
            'peer checkbox w-4 h-4 appearance-none border rounded  transition-colors duration-300 ease-in-out',
            themeStore.current === 'light'
              ? 'border-dark-300 checked:bg-dark-100'
              : 'border-light-300 checked:bg-light-100'
          )
        "
      />
      <span class="absolute opacity-0 peer-checked:opacity-100"
        ><CheckIcon
          :class="
            clsx(
              'h-3 w-3',
              themeStore.current === 'light'
                ? 'fill-light-100 stroke-light-100'
                : 'fill-dark-100 stroke-dark-100'
            )
          "
      /></span>
    </label>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Icons
import CheckIcon from "@/components/icons/CheckIcon.vue";

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  extraClasses?: string;
  isDisabled?: boolean;
}>();
</script>
