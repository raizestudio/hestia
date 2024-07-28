<template>
  <form method="dialog">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  </form>
  <div v-if="isLoading">
    <span>Envoie email en cours</span>
  </div>
  <div v-else>
    <div v-if="hasError" class="flex flex-col gap-6">
      <div class="flex flex-col justify-center items-center">
        <ErrorIcon class="w-20 h-20 stroke-error" />
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Quelque chose s'est mal passé.</h3>
        <div>
          <span>Si le problème persiste, une solution peut déjà exister dans les questions fréquentes.</span>
          <br/>
          <span>Vous pouvez également contacter le support.</span>
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button
          class="btn btn-sm btn-content"
          @click="() => (hasError = false)"
        >
          Annuler.
        </button>
        <button class="btn btn-sm btn-primary" @click="sendConfirmationEmail">
          Réessayer.
        </button>
      </div>
    </div>
    <div v-else-if="hasSuccess" class="flex flex-col gap-2">
      <div class="flex flex-col justify-center items-center">
        <CircleCheckIcon class="w-20 h-20 stroke-success" />
      </div>
      <div class="flex flex-col gap-2">
        <h3 class="text-lg font-semibold">Un email vous à été envoyé.</h3>
        <div>
          <span>En cliquant sur le lien vous aurez accès à votre compte en quelques minutes.</span>
        </div>
        <div class="flex justify-end gap-4">
          <button
            class="btn btn-sm btn-content"
          >
            Fermer
          </button>
        </div>
      </div>
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
        <!-- <span>{{ creationEmail }}</span> -->
        <button class="btn btn-sm btn-primary" @click="sendConfirmationEmail" :disabled="!isEmailValid">
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Composables
import { createFromEMail } from "~/composables/api/useUsers";

// Icons
import ErrorIcon from "~/components/assets/icons/ErrorIcon.vue";
import CircleCheckIcon from "../assets/icons/CircleCheckIcon.vue";

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

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(creationEmail.value);
});
</script>
