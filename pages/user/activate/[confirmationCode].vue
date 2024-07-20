<template>
  <NuxtLayout>
    <SectionFullScreen>
      <CardSection>
        <div v-if="isLoading">
          <span>Chargement</span>
        </div>
        <div v-else class="flex justify-center">
          <DefaultH1 title="Félicitations, votre adresse email est validé" />
        </div>
        <div class="flex flex-col gap-2 w-1/3">
          <label for="firstName">Prénom</label>
          <input
            type="text"
            class="input input-sm input-bordered"
            name="firstName"
            placeholder="Prénom"
          />
          <label for="firstName">Nom</label>
          <input
            type="text"
            class="input input-sm input-bordered"
            placeholder="Nom"
          />
          <label for="firstName">Utilisateur</label>
          <input
            type="text"
            class="input input-sm input-bordered"
            placeholder="Nom d'utilisateur"
          />
          <label for="firstName">Mot de passe</label>
          <input
            type="text"
            class="input input-sm input-bordered"
            placeholder="Mot de passe"
          />
          <label for="firstName">Confirmation mot de passe</label>
          <input
            type="text"
            class="input input-sm input-bordered"
            placeholder="Confirmation mot de passe"
          />
          <div>
            <button class="btn btn-sm btn-primary">Créer mon compte</button>
          </div>
        </div>
        <NuxtErrorBoundary>
          <template #error="{ error, clearError }">
            You can display the error locally here: {{ error }}
            <button @click="clearError">
              This will clear the error.
            </button>
          </template>
        </NuxtErrorBoundary>
      </CardSection>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Composables
import { confirmEmail } from "~/composables/api/useUsers";

// Components
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";
import CardSection from "~/components/card/CardSection.vue";
import DefaultH1 from "~/components/title/DefaultH1.vue";

const router = useRouter();
const route = useRoute();

const confirmationCode = route.params.confirmationCode.toString();
const isLoading = ref(false);
const hasError = ref(false);

onMounted(async () => {
  isLoading.value = true;
  console.log(confirmationCode);
  try {
    const response: any = confirmEmail(confirmationCode);

    if (response.status !== 200) {
      throw new Error("Erreur lors de la confirmation");
    }
  } catch (error) {
    console.log(error);
    hasError.value = true;
  }
});

definePageMeta({
  layout: 'anonymous'
})

useSeoMeta({
  title: 'Confirmation création de compte',
  description: 'Création de compte'
});
</script>