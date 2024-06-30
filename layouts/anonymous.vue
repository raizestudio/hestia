<template>
  <DefaultLayoutLoading v-if="coreStore.isLoading"/>
  <div v-else class="flex flex-col h-screen">
    <NavBarTop />
    <slot />
    <FooterDefaultLayoutFooter />
  </div>
</template>

<script lang="ts" setup>
import NavBarTop from '~/components/nav/NavBarHorizontal.vue';
import DefaultLayoutLoading from '~/components/loading/DefaultLayoutLoading.vue';

const coreStore = useCoreStore();
</script>
