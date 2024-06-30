<template>
  <NuxtLayout>
    <div class="flex flex-col grow">
      <CardSection>
        <div class="flex flex-col justify-center items-center h-full gap-4">
          <h1 class="text-2xl font-black">Erreur</h1>
          <p v-if="props.error?.statusCode === 404">La page que vous cherchez est introuvable!</p>
          <p v-else-if="props.error?.statusCode === 500">Une erreur s'est produit lors du traitement de la requête!</p>
          <p v-else>Quelque chose s'est mal passé!</p>
        </div>
      </CardSection>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>