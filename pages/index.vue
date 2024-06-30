<template>
  <NuxtLayout>
    <div>
      Landing
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import pkg from '~/package.json';

onMounted(() => {
  document.title = `${pkg.name}`;
})
</script>