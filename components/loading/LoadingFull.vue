<template>
  <div
    :class="`flex flex-col w-screen h-screen ${
      theme === 'light' ? 'bg-light-100' : 'bg-dark-100'
    }`"
  >
    <ProgressBar />
    <div class="flex flex-col justify-center items-center gap-10 grow">
      <div class="flex items-center gap-1.5">
        <SnexiLogoIcon class="w-36 fill-primary-100" :letters-classes="`transition-colors duration-300 ease-out ${theme === 'light' ? 'fill-dark-100' : 'fill-light-100'}`" />
        <!-- <h1
          :class="`flex items-end h-full text-4xl font-black ${
            theme === 'light' ? 'text-dark-100' : 'text-light-100'
          }`"
        >
          Hestia
        </h1> -->
      </div>
      <span
        :class="`text-lg font-semibold ${
          theme === 'light' ? 'text-dark-200' : 'text-light-200'
        }`"
        >Veuillez patienter pendant le chargement.</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import clsx from "clsx";

// Icons
// import HestiaLogoIcon from "@/components/icons/HestiaLogoIcon.vue";
import SnexiLogoIcon from "@/components/icons/SnexiLogoIcon.vue";

// Stores
const themeStore = useThemeStore();

const themeCookie = useCookie("theme");

const theme = computed(() => themeCookie.value || themeStore.current || "light");
</script>
