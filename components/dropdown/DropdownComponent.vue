<template>
  <div x-data="{ isOpen: true }" class="relative">
    <slot name="trigger" />
    <div
      x-show="isOpen"
      :class="
        clsx(
          'absolute right-0 z-20 w-64 overflow-hidden origin-top-right rounded sm:w-80',
          themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200',
          props.marginTop ? props.marginTop : 'mt-2'
        )
      "
    >
      <Transition>
        <slot name="content" />
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  marginTop?: string;
}>();
</script>

<style scoped>
.v-enter-active {
  transition: opacity 0 linear;
}
.v-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
