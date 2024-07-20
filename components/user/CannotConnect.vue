<template>
  <form method="dialog">
    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
  </form>
  <div v-if="isLoading">
    <span>Chargement</span>
  </div>
  <div v-else>
    <div v-if="hasError" class="flex flex-col gap-2">
      <span>Erreur.</span>
      <!-- <button class="btn btn-sm btn-primary" @click="sendConfirmationEmail">
        Réessayer.
      </button> -->
    </div>
    <div v-else-if="hasSuccess" class="flex flex-col gap-2">
      <span>Tout roule.</span>
    </div>
    <div v-else>
      <h3 class="text-lg font-bold">
        🤔 Il semblerait que vous ayez des difficultés à vous connecter.
      </h3>
      <p class="">Voici quelques étapes qui pourrait vous aider.</p>
      <div class="flex flex-col gap-2 mt-8">
        <h4 class="text-md font-semibold">Je ne me souviens plus de mon email/utilisateur</h4>
        <span>Vous pouvez soumettre un ticket et vous seres recontacté par un "ADMIN".</span>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <h4 class="text-md font-semibold">Je ne me souviens plus de mon mot de passe</h4>
        <span>Vous pouvez demander un lien pour réinitialiser votre mot de passe en cliquant dans le bouton ci-dessous.</span>
        <button class="btn btn-sm btn-primary w-fit">Réinitialiser</button>
      </div>
      <div class="flex flex-col gap-2 mt-6">
        <h4 class="text-md font-semibold">Je rencontre un problème different</h4>
        <span>Veuillez contacter un agent en cliquant ci-dessous.</span>
        <button class="btn btn-sm btn-primary w-fit">Contacter agent</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const coreStore = useCoreStore();

const isLoading = ref(false);
const creationEmail = ref("");
const hasError = ref(false);
const hasSuccess = ref(false);

const sendConfirmationEmail = async () => {
  isLoading.value = true;
};
</script>
