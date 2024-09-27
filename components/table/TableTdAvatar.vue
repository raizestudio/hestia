<template>
  <div class="flex items-center gap-3">
    <AvatarComponent
      :src="props.avatar"
      :alt="props.userFirstName"
      :first-name="props.userFirstName"
      :last-name="props.userLastName"
    />
    <div>
      <div :class="clsx('font-bold', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">{{ label }}</div>
      <div :class="clsx('text-sm opacity-50')">{{ extraLabel }}</div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Components
import AvatarComponent from '@/components/avatar/AvatarComponent.vue';

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  avatar: string;
  label?: string;
  extraLabel?: string;
  userFirstName: string;
  userLastName: string;
  maskClass?: string;
  tableSize?: string;
}>();
</script>
