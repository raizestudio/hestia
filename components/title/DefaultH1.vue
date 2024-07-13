<template>
  <h1 class="text-4xl font-black select-none">
    {{ title }}
  </h1>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String
})
</script>