<template>
  <Transition mode="out-in">
    <LoadingFull v-if="coreStore.isLoadingGlobal" />
    <div
      v-else
      :class="`flex flex-col h-screen transition-colors duration-700 ease-in-out ${
        themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100'
      }`"
    >
      <AlertComponent />
      <NavBar />
      <div class="relative flex grow">
        <SideBar v-if="userStore.isAuthenticated" />
        <slot />
      </div>
      <FooterComponent />
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Components
import NavBar from "@/components/navbar/NavBar.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";
import LoadingFull from "@/components/loading/LoadingFull.vue";
import AlertComponent from "@/components/alert/AlertComponent.vue";
import SideBar from "@/components/sidebar/SideBar.vue";

// Stores
const themeStore = useThemeStore();
const coreStore = useCoreStore();
const userStore = useUserStore();
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