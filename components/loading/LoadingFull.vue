<template>
  <div
    :class="`flex flex-col w-screen h-screen ${
      themeStore.current === 'light' ? 'bg-light-100' : 'bg-dark-100'
    }`"
  >
    <ProgressBar />
    <div class="flex flex-col justify-center items-center gap-10 grow">
      <div class="flex items-center gap-1.5">
        <HestiaLogoIcon class="w-12 fill-primary-100" />
        <h1
          :class="`flex items-end h-full text-4xl font-black ${
            themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'
          }`"
        >
          Hestia
        </h1>
      </div>
      <span
        :class="`text-lg font-semibold ${
          themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200'
        }`"
        >Veuillez patienter pendant le chargement.</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// Icons
import HestiaLogoIcon from "@/components/icons/HestiaLogoIcon.vue";

// Stores
const themeStore = useThemeStore();
</script>
