<template>
  <div class="flex flex-col h-screen">
    <NavBar />
    <div class="grow">
      <slot />
    </div>
    <FooterComponent />
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/navbar/NavBar.vue';
import FooterComponent from '~/components/footer/FooterComponent.vue';
</script>