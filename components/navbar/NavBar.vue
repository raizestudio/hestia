<template>
  <nav
    :class="`flex items-center justify-between px-2 md:px-10 h-12 transition-colors duration-500 ease-in-out ${
      themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
    }`"
  >
    <div class="text-lg font-black">
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
        <ButtonComponent @click="() => router.push('/auth/login')">Mon compte</ButtonComponent>
      </div>
      <ThemeToggle />
    </div>
  </nav>
</template>

<script setup lang="ts">
// Components
import ThemeToggle from "~/components/navbar/ThemeToggle.vue";
import ButtonComponent from "~/components/button/ButtonComponent.vue";

// Stores
const themeStore = useThemeStore();

const router = useRouter();
</script>
