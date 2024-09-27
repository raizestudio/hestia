<template>
  <div class="flex gap-1">
    <ButtonComponent :class="clsx('', themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100')">
      <InfoCircleIcon :class="clsx('w-4 h-4 fill-info-100')" />
    </ButtonComponent>
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Components
import InfoCircleIcon from '@/components/icons/InfoCircleIcon.vue';

// Stores
const themeStore = useThemeStore();

const router = useRouter();

const props = defineProps<{
  option: any;
  optionKey: string;
  url: string;
  isActiveAction: (key: any, isActive: boolean) => void;
  deleteAction: (key: any) => void;
  restoreAction: (key: any) => void;
  toggleModal: (key: any) => void;
}>();
</script>