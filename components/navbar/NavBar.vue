<template>
  <nav
    :class="
      clsx(
        'flex items-center justify-between px-2 md:px-10 h-10 transition-colors duration-500 ease-in-out',
        themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
      )
    "
  >
    <div
      :class="clsx('flex items-center gap-1 cursor-pointer')"
      @click="() => router.push('/')"
    >
      <SnexiLogoIcon
        :class="
          clsx(
            'w-14 fill-primary-100 hover:fill-primary-300 transition-colors duration-300 ease-out'
          )
        "
        :letters-classes="`transition-colors duration-300 ease-out ${
          themeStore.current === 'light' ? 'fill-dark-100' : 'fill-light-100'
        }`"
      />
      <!-- <span
        :class="`text-xl font-black cursor-pointer ${
          themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
        }`"
        @click="() => router.push('/')"
        >Hestia</span
      > -->
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
      <ButtonComponent
        v-if="userStore.isAuthenticated"
        :class="clsx('mr-6 bg-primary-100 hover:bg-primary-300 text-light-100')"
        @click="() => (modalStore.showCreateModal = true)"
        >Créer</ButtonComponent
      >
      <UserComponent v-if="userStore.isAuthenticated" />
      <NotificationDropdown v-if="userStore.isAuthenticated" />
      <div
        v-if="userStore.isAuthenticated"
        :class="`relative cursor-pointer rounded-full p-1 ${
          themeStore.current === 'light'
            ? 'hover:bg-light-300'
            : 'hover:bg-dark-300'
        }`"
      >
        <CircleComponent
          v-if="orderStore.fakeCounter > 0"
          :class="
            clsx('absolute top-0 right-0 flex justify-center items-center z-10')
          "
        >
          <span class="text-xs font-semibold text-light-100">{{
            orderStore.fakeCounter
          }}</span>
        </CircleComponent>
        <CartLargeAltIcon
          :class="
            clsx(
              'w-6 h-6 translate-x-[2px] transition-colors duration-300 ease-in-out',
              themeStore.current === 'light'
                ? 'fill-dark-200'
                : 'fill-light-200'
            )
          "
        />
      </div>
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
import CircleComponent from "@/components/shape/CircleComponent.vue";

// Icons
// import HestiaLogoIcon from "@/components/icons/HestiaLogoIcon.vue";
import SnexiLogoIcon from "@/components/icons/SnexiLogoIcon.vue";
import CartLargeAltIcon from "@/components/icons/CartLargeAltIcon.vue";

// Stores
const themeStore = useThemeStore();
const coreStore = useCoreStore();
const userStore = useUserStore();
const modalStore = useModalStore();
const orderStore = useOrderStore();

const router = useRouter();
</script>
