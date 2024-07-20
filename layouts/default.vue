<template>
  <DefaultLayoutLoading v-if="coreStore.isLoading"/>
  <DefaultDrawer v-else>
    <div ref="containerRef" class="flex flex-col h-screen max-h-screen">
      <NavBarTop />
      <slot />
      <FooterDefaultLayoutFooter />
    </div>
  </DefaultDrawer>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';

// Components
import DefaultDrawer from '~/components/drawer/DefaultDrawer.vue';
import DefaultLayoutLoading from '~/components/loading/DefaultLayoutLoading.vue';
import NavBarTop from '~/components/nav/NavBarHorizontal.vue';

const coreStore = useCoreStore();

const containerRef: any = ref(null);

onMounted(() => {
  console.log(`DEBUG: ${containerRef.value.clientHeight}`)
  coreStore.mainContainerWidth = containerRef.value.clientWidth;
  coreStore.mainContainerHeight = containerRef.value.clientHeight;
  window.addEventListener("resize", recalculateContainerWidth);
});

const recalculateContainerWidth = () => {
  console.log(`DEBUG: ${containerRef.value.clientHeight}`)
  coreStore.mainContainerWidth = containerRef.value.clientWidth;
  coreStore.mainContainerHeight = containerRef.value.clientHeight;
};

</script>
