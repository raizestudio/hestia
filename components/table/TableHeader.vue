<template>
  <div :class="clsx('flex justify-between items-center mb-2')">
    <div class="flex items-center gap-2">
      <span :class="clsx('font-semibold text-xl select-none')">{{props.titleLabel}}</span>
      <span
        :class="
          clsx(
            'text-xs opacity-50 rounded  p-0.5 select-none',
            themeStore.current === 'light' ? 'bg-light-300' : 'bg-dark-300'
          )
        "
        >{{ props.subTitleLabel }}</span
      >
    </div>
    <div>
      <ButtonComponent
        :class="
          clsx(
            '',
            themeStore.current === 'light' ? 'bg-light-200' : 'kbg-dark-200'
          )
        "
        >{{ props.addActionLabel }}</ButtonComponent
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();
const usersStore = useUsersStore();

const props = defineProps<{
  titleLabel?: string;
  subTitleLabel?: string;
  addActionLabel?: string;
}>();
</script>
