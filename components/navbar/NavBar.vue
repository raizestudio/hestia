<template>
  <nav
    :class="`flex items-center justify-between px-2 md:px-10 h-10 transition-colors duration-500 ease-in-out ${
      themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
    }`"
  >
    <div class="text-xl font-black">
      <span
        :class="`cursor-pointer ${
          themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
        }`"
        @click="() => router.push('/')"
        >Hestia</span
      >
    </div>
    <div class="flex items-center gap-2">
      <div>
        <ButtonComponent @click="() => router.push('/auth/login')">
          <span class="text-sm">Mon compte</span>
        </ButtonComponent>
      </div>
      <ThemeToggle />
      <div :class="`cursor-pointer rounded-full p-1 ${themeStore.current === 'light' ? 'hover:bg-light-300' : 'hover:bg-dark-300'}`">
        <SupportIcon :class="`w-6 transition-colors duration-300 ease-in-out ${ themeStore.current === 'light' ? 'fill-dark-300' : 'fill-light-300'}`" />

      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Components
import ThemeToggle from "~/components/navbar/ThemeToggle.vue";
import ButtonComponent from "~/components/button/ButtonComponent.vue";

// Icons
import SupportIcon from "~/components/icons/SupportIcon.vue";

// Stores
const themeStore = useThemeStore();

const router = useRouter();
</script>
