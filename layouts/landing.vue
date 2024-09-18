<template>
  <div
    :class="`flex flex-col h-screen transition-colors duration-700 ease-in-out ${
      themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100'
    }`"
  >
    <Transition mode="out-in">
      <LoadingFull v-if="coreStore.isLoadingGlobal" />
      <div v-else>
        <NavBar />
        <div class="flex grow">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Components
import NavBar from "@/components/navbar/NavBar.vue";

// Stores
const themeStore = useThemeStore();
const coreStore = useCoreStore();
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>