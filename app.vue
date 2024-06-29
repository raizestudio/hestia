<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'

const coreStore = useCoreStore()
const forceUpdateFlag = ref(false)

onMounted(() => {
  
  coreStore.initializeTheme()
})

watch(() => coreStore.theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  forceUpdateFlag.value = !forceUpdateFlag.value
})
</script>
