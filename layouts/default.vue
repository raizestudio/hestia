<template>
  <DefaultLayoutLoading v-if="coreStore.isLoading"/>
  <DefaultDrawer v-else>
    <div class="flex flex-col h-screen">
      <NavBarTop />
      <slot />
      <FooterDefaultLayoutFooter />
    </div>
  </DefaultDrawer>
</template>

<script lang="ts" setup>
import DefaultDrawer from '~/components/drawer/DefaultDrawer.vue';
import DefaultLayoutLoading from '~/components/loading/DefaultLayoutLoading.vue';
import NavBarTop from '~/components/nav/NavBarHorizontal.vue';

const coreStore = useCoreStore();
</script>
