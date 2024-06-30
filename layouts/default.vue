<template>
  <div class="flex flex-col h-screen">
    <NavBarTop />
    <slot />
    <FooterDefaultLayoutFooter />
  </div>
</template>

<script lang="ts" setup>
import NavBarTop from '~/components/nav/NavBarHorizontal.vue';

</script>

<style>

</style>