<template>
  <nav
    :class="
      clsx(
        'flex items-center justify-between px-2 md:px-10 h-10 transition-colors duration-500 ease-in-out',
        themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
      )
    "
  >
    <div :class="clsx('flex items-center gap-1')">
      <HestiaLogoIcon :class="clsx('w-4 fill-primary-100')" />
      <span
        :class="`text-xl font-black cursor-pointer ${
          themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
        }`"
        @click="() => router.push('/')"
        >Hestia</span
      >
    </div>
    <div class="flex items-center gap-2">
      <div>
        <ButtonComponent
          v-if="!userStore.isAuthenticated"
          @click="() => router.push('/auth/login')"
        >
          <span class="text-sm">Mon compte</span>
        </ButtonComponent>
      </div>
      <UserComponent />
      <NotificationDropdown />
      <ThemeToggle />
      <SupportChatDropdown />
    </div>
    <ProgressBar
      v-if="coreStore.isLoadingLocal"
      class="absolute top-10 left-0 z-50"
      height-class="h-1"
    />
  </nav>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components
import ThemeToggle from "@/components/navbar/ThemeToggle.vue";
import ButtonComponent from "@/components/button/ButtonComponent.vue";
import ProgressBar from "@/components/progress/ProgressBar.vue";
import SupportChatDropdown from "@/components/chat/SupportChatDropdown.vue";
import UserComponent from "./UserComponent.vue";

// Icons
import HestiaLogoIcon from "@/components/icons/HestiaLogoIcon.vue";

// Stores
const themeStore = useThemeStore();
const coreStore = useCoreStore();
const userStore = useUserStore();

const router = useRouter();
</script>
