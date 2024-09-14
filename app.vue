<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// Composables
import { getSessionId } from '~/composables/api/useSession';

// Stores
const userStore = useUserStore();

onMounted(async () => {
  const sessionId = await getSessionId();
  userStore.setSessionId(sessionId);
});
</script>