<template>
  <NuxtLayout>
    <div>
      <h1>{{ username }}</h1>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">

const route = useRoute();

const username = ref(route.params.user);
</script>