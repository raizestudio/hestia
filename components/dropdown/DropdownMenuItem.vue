<template>
  <div class="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-red-200" @click="handleClick">
    <slot name="icon" />
    <span :class="clsx('text-sm', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">
      {{ props.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Stores
const themeStore = useThemeStore();

const router = useRouter();

const props = defineProps<{
  text: string;
  url?: string;
}>();

const handleClick = () => {
  if (props.url) {
    router.push(props.url);
  }
};
</script>