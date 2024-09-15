<template>
  <NuxtLayout :name="layout">
    <div class="flex h-full grow">
      <NotFound v-if="props.error?.statusCode === 404" />

      <!-- <div class="flex flex-col justify-center items-center h-full gap-4">
        <h1 class="text-2xl font-black">
          Le contenu que vous recherchez ne semble pas être ici.
        </h1> -->
      <!-- <p v-if="props.error?.statusCode === 404">{{props.error.statusMessage}}</p> -->
      <!-- <p v-if="props.error?.statusCode === 404">
          {{ props.error.data.path }}
        </p>
        <div v-else-if="props.error?.statusCode === 500" class="flex flex-col">
          <span>{{ props.error.statusMessage }}</span>
        </div>
        <p v-else>Quelque chose s'est mal passé!</p>
        <ButtonComponent
          :class="`${
            themeStore.current === 'light' ? 'bg-light-200' : 'bg-dark-200'
          }`"
          @click="router.push('/')"
          >Retour à l'accueil</ButtonComponent
        >
      </div> -->
      <!-- </CardSection> -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import { onMounted } from "vue";

// Components
import ButtonComponent from "./components/button/ButtonComponent.vue";

// Icons
import InfoCircleIcon from "@/components/icons/InfoCircleIcon.vue";
import NotFound from "@/components/error/NotFound.vue";

// Composables
import { getSessionId } from "@/composables/api/useSession";

// Stores
const themeStore = useThemeStore();
const coreStore = useCoreStore();
const userStore = useUserStore();

const router = useRouter();

const layout = "default";

interface ExtendedNuxtError extends NuxtError {
  data: {
    path: string;
  };
}
const props = defineProps({
  error: Object as () => ExtendedNuxtError,
});

onMounted(async () => {
  const sessionId = await getSessionId();
  userStore.setSessionId(sessionId);
  coreStore.isLoadingGlobal = false;
  coreStore.updateHealthCheck();
  setInterval(async () => {
    coreStore.updateHealthCheck();
  }, 1000 * 5);
});

useSeoMeta({
  title: "Erreur",
  description: "Quelque chose s'est mal passé!",
});
</script>
