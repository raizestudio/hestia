<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// Composables
import { getSessionId } from "~/composables/api/useSession";

// Stores
const userStore = useUserStore();
const coreStore = useCoreStore();

onMounted(async () => {
  const sessionId = await getSessionId();
  userStore.setSessionId(sessionId);
  coreStore.isLoadingGlobal = false;
  coreStore.updateHealthCheck();
  setInterval(async () => {
    coreStore.updateHealthCheck();
  }, 1000 * 5);
});
</script>
