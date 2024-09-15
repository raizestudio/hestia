<template>
  <div
    v-if="alertStore.showAlert"
    :class="`absolute flex w-full max-w-sm overflow-hidden translate-x-8 right-10 bottom-12 rounded shadow-sm z-50 ${ themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'}`"
  >
    <div class="flex items-center justify-center w-12 bg-emerald-500">
      <CheckCircleIcon class="w-6 h-6 fill-light-100" />
    </div>

    <div class="px-4 py-2 -mx-3">
      <div class="mx-3">
        <span class="font-semibold text-emerald-500 dark:text-emerald-400"
          >Succès</span
        >
        <p :class="`text-sm ${ themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200'}`">
          Message de succès
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Icons
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";

// Stores
const themeStore = useThemeStore();
const alertStore = useAlertStore();
</script>