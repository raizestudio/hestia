<template>
  <NuxtLayout>
    <div :class="clsx('grid grid-cols-2')">
      <div>left</div>
      <div>right</div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from 'clsx';
import { onMounted } from "vue";

// Stores

onMounted(() => {

})
</script>