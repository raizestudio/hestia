<template>
  <div class="flex flex-col justify-center items-center grow">
    <div class="flex flex-col justify-center items-center gap-2 w-full">
      <div class="flex flex-col items-center gap-1">
        <div :class="`p-2 rounded-full ${ themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'}`">
          <InfoCircleIcon :class="`w-8 h-8 stroke-primary-100 fill-none`" />
        </div>
        <span class="text-primary-200">Erreur 404</span>
      </div>
      <div class="flex flex-col items-center mt-2">
        <h1 :class="`text-xl font-semibold ${ themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100'}`">
          Le contenu que vous recherchez ne semble pas être ici.
        </h1>
        <span :class="`text-sm ${ themeStore.current === 'light' ? 'text-dark-300' : 'text-light-300'}`"
          >Et nos robots on cherché partout!</span
        >
      </div>
      <div class="flex gap-2">
        <ButtonComponent
          :extra-classes="`flex border ${ themeStore.current === 'light' ? 'border-light-200' : 'border-dark-200'} active:bg-light-300`"
          @click="router.back()"
          >
          <ArrowIcon :class="`w-5 ${ themeStore.current === 'light' ? 'fill-dark-300' : 'fill-light-300'}`" />
          Retour en arrière</ButtonComponent
        >
        <ButtonComponent
          extra-classes="bg-primary-100 hover:bg-primary-200 text-light-200"
          @click="router.push('/')"
          >Accueil</ButtonComponent
        >
      </div>
      <div class="flex justify-center gap-4 mt-6 w-3/5">
        <div class="flex flex-col grow px-2 py-1 bg-primary-300 rounded">
          <DocumentBookIcon class="w-6 h-6 fill-dark-100" />
          <span class="text-sm text-dark-300">Documentation</span>
          <span class="text-xs">Explorez la documentation</span>
        </div>
        <div class="flex flex-col grow px-2 py-1 bg-primary-300 rounded">
          <FeedIcon class="w-6 h-6 fill-dark-100" />
          <span class="text-sm text-dark-300">Nouveautés</span>
          <span class="text-xs">Explorez la documentation</span>

        </div>
        <div class="flex flex-col grow px-2 py-1 bg-primary-300 rounded">
          <ChatRoundIcon class="w-6 h-6 fill-dark-100" />
          <span class="text-sm text-dark-300">Discutez avec nous</span>
          <span class="text-xs">Explorez la documentation</span>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import ButtonComponent from "@/components/button/ButtonComponent.vue";

// Icons
import InfoCircleIcon from "@/components/icons/InfoCircleIcon.vue";
import DocumentBookIcon from "@/components/icons/DocumentBookIcon.vue";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import FeedIcon from "@/components/icons/FeedIcon.vue";
import ChatRoundIcon from "@/components/icons/ChatRoundIcon.vue";

// Stores
const themeStore = useThemeStore();

const router = useRouter();
</script>
