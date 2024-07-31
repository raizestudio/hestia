<template>
  <div class="flex justify-center">
    <div class="w-full" style="max-width: 2500px">
      <div
        v-if="coreStore.showCookieBanner"
        class="toast toast-top toast-center mt-10"
      >
        <div role="alert" class="alert px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-info h-4 w-4 shrink-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span class="text-sm"
            >Ce site utilise des cookies. En continuant la navigation on
            considère que vous donnez votre accord.</span
          >
          <div>
            <!-- <button class="btn btn-sm">Deny</button> -->
            <button class="btn btn-xs btn-primary">Accept</button>
          </div>
        </div>
      </div>
      <ToastStack v-if="coreStore.hasNotification" class="z-50">
        <!-- <div
          v-for="notification in _.reverse(unreadNotifications)"
          :key="notification.id"
          class="toast mb-6 w-80"
        > -->
        <div
          v-for="notification in unreadNotifications"
          :key="notification.id"
          class="toast mb-6 w-80"
        >
          <!-- <ToastAcceptDeny /> -->
          <ToastError
            :id="notification.id"
            :title="notification.title"
            :message="notification.message"
            :timestamp="notification.timestamp"
            :type="notification.type"
          />
        </div>
      </ToastStack>
      <!-- <NuxtRouteAnnouncer /> -->
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import _ from "lodash";
import { useNuxtApp } from "#app";
// const { $socket }: any = useNuxtApp();

const router = useRouter();
const route = useRoute();

const coreStore = useCoreStore();
const userStore = useUserStore();
const forceUpdateFlag = ref(false);

import ToastStack from "./components/toast/ToastStack.vue";
import ToastAcceptDeny from "./components/toast/ToastAcceptDeny.vue";
import ToastError from "./components/toast/ToastError.vue";
import DefaultToast from "./components/toast/DefaultToast.vue";

const message = ref("");

// console.log(process.env.NODE_ENV)
onMounted(async () => {
  coreStore.isLoading = true;
  coreStore.initializeTheme();
  await coreStore.fetchSettings();
  const token = localStorage.getItem("token");
  if (token) {
    await userStore.retrieveSessionFromToken();
    router.push((route.query.redirect as string) || "/dashboard");
  }
  // $socket.on('message', (data: string) => {
  //   message.value = data
  // });
  coreStore.isLoading = false;
});

const unreadNotifications = computed(() => {
  return coreStore.notifications.filter((n) => !n.isRead);
});
watch(
  () => coreStore.theme,
  (newTheme) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    forceUpdateFlag.value = !forceUpdateFlag.value;
  }
);
</script>
