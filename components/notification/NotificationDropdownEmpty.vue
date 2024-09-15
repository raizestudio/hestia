<template>
  <div class="flex min-w-72 min-h-44">
    <div class="flex flex-col justify-center items-center grow gap-2">
      <CheckCircleIcon class="w-10 fill-success-300" />
      <span :class="clsx('text-sm font-semibold', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">Aucune nouvelle notification</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Components
import CheckCircleIcon from '@/components/icons/CheckCircleIcon.vue';

// Stores
const themeStore = useThemeStore();
</script>