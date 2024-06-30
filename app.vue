<template>
  <div>
    <!-- <NuxtRouteAnnouncer /> -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
const router = useRouter()

const coreStore = useCoreStore()
const userStore = useUserStore()
const forceUpdateFlag = ref(false)

onMounted(async () => {
  coreStore.isLoading = true
  const token = localStorage.getItem('token')
  if (token) {
    await userStore.retrieveSessionFromToken();
    console.log(router)
    router.push('/dashboard')
  }
  coreStore.initializeTheme()
  coreStore.isLoading = false
})

watch(() => coreStore.theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  forceUpdateFlag.value = !forceUpdateFlag.value
})
</script>
