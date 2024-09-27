<template>
  <div :class="clsx('flex flex-col grow p-2 overflow-scroll')" :style="`height: ${sectionHeight}px`">
    <slot />
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Stores
const menuStore = useMenuStore();

const sectionHeight = ref(window.innerHeight - 64);


window.addEventListener('resize', () => {
  if (window.innerWidth < 1024) {
    sectionHeight.value = window.innerHeight - 100;
  } else {
    sectionHeight.value = window.innerHeight - 64;
  }
});
</script>