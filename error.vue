<template>
  <NuxtLayout :name="layout">
    <div class="flex flex-col grow">
      <CardSection>
        <div class="flex flex-col justify-center items-center h-full gap-4">
          <h1 class="text-2xl font-black">Erreur</h1>
          <p v-if="props.error?.statusCode === 404">{{props.error.statusMessage}}</p>
          <div v-else-if="props.error?.statusCode === 500" class="flex flex-col">
            <span>{{props.error.statusMessage}}</span>
          </div>
          <p v-else>Quelque chose s'est mal passé!</p>
          <button class="btn btn-sm btn-primary" @click="router.push('/')">Retour à l'accueil</button>

        </div>
      </CardSection>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'
import { onMounted } from 'vue';

const router = useRouter();
const coreStore = useCoreStore();
const layout = "nonav";

const props = defineProps({
  error: Object as () => NuxtError
})

onMounted(() => {
  coreStore.isLoading = false
})

useSeoMeta({
  title: 'Erreur',
  description: 'Quelque chose s\'est mal passé!'
})
</script>