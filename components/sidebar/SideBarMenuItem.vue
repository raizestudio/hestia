<template>
  <div>
    <div
      :class="
        clsx(
          'w-full px-2 py-0.5 rounded cursor-pointer',
          themeStore.current === 'light'
            ? 'bg-light-100 hover:bg-light-200'
            : 'bg-dark-100 hover:bg-dark-200'
        )
      "
    >
      <NuxtLink :to="props.url"
        ><span>{{ props.label }}</span></NuxtLink
      >
    </div>
    <div>s</div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  label: string;
  description: string;
  url: string;
  icon: string;
}>();
</script>
