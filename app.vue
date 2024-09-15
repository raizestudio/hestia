<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// Composables
import { getSessionId } from "@/composables/api/useSession";

// Stores
const userStore = useUserStore();
const coreStore = useCoreStore();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    await userStore.validateCurrentSession();
    router.push((route.query.redirect as string) || "/dashboard");
  }

  coreStore.isLoadingGlobal = false;
  coreStore.updateHealthCheck();
  setInterval(async () => {
    coreStore.updateHealthCheck();
  }, 1000 * 5);
});
</script>
