<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// Stores
const userStore = useUserStore();
const coreStore = useCoreStore();
const themeStore = useThemeStore();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  themeStore.initTheme();
  coreStore.getSettings();
  try {
    await userStore.validateCurrentSession();
    router.push((route.query.redirect as string) || "/dashboard");
  } catch (error) {
    userStore.getSession();
  } finally {
    coreStore.isLoadingGlobal = false;
  }
  coreStore.initHealthCheck();
});
</script>

<style lang="css">
body {
  overflow: hidden;
}

</style>