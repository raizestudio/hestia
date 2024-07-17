<template>
  <div v-if="isLoading">
    <span>Envoie email en cours</span>
  </div>
  <div v-else>
    <div v-if="hasError" class="flex flex-col gap-2">
      <span>Erreur lors de l'envoi.</span>
      <button class="btn btn-sm btn-primary" @click="sendConfirmationEmail">Réessayer.</button>
    </div>
    <div v-else-if="hasSuccess" class="flex flex-col gap-2">
      <span>Un email vous a été envoyé.</span>
    </div>
    <div v-else>
      <h3 class="text-lg font-bold">
        Bienvenue sur {{ coreStore.settings.app_name }}!
      </h3>
      <p class="py-4">Veuillez indiquer votre adresse email</p>
      <div class="flex gap-2">
        <input
          v-model="creationEmail"
          type="email"
          class="input input-sm input-bordered"
          placeholder="Adresse email"
        />
        <span>{{ creationEmail }}</span>
        <button class="btn btn-sm btn-primary" @click="sendConfirmationEmail">
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Composables
import { createFromEMail } from "~/composables/api/useUsers";

const coreStore = useCoreStore();

const isLoading = ref(false);
const creationEmail = ref("");
const hasError = ref(false);
const hasSuccess = ref(false);

const sendConfirmationEmail = async () => {
  isLoading.value = true;
  try {
    const response: any = await createFromEMail(creationEmail.value);
    if (response.status !== 201) {
      throw new Error("Erreur lors de l'envoi");
    }
    hasError.value = false;
    hasSuccess.value = true;
  } catch (error) {
    console.log(error);
    hasError.value = true;
    hasSuccess.value = false;

  } finally {
    isLoading.value = false;
  }
};
</script>
