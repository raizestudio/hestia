<template>
  <NuxtLayout>
    <CardSection>
      <div class="flex flex-col gap-4">
        <h1 class="text-xl font-bold">
          Profil de {{ userStore.user.username }}
        </h1>
        <div class="flex justify-center items-center gap-10">
          <img
            :src="`http://localhost:8000${userStore.user.avatar}`"
            alt="Avatar"
            class="w-24 h-24 rounded-full shadow"
          />
          <div class="flex flex-col grow gap-2">
            <span class="font-semibold">Informations Personnelles</span>
            <div class="flex gap-4 grow">
              <div class="flex items-center flex-col gap-1 basis-1/3">
                <div class="flex items-center gap-2 badge rounded p-4 shadow w-full">
                  Nom d'utilisateur:
                  <span class="badge badge-outline rounded">{{
                    userStore.user.username
                  }}</span>
                </div>
                <div class="flex items-center gap-2 badge rounded p-4 shadow w-full">
                  Prénom:
                  <span class="badge badge-outline rounded">{{
                    userStore.user.first_name
                  }}</span>
                </div>
                <div class="flex items-center gap-2 badge rounded p-4 shadow w-full">
                  Nom:
                  <span class="badge badge-outline rounded">{{
                    userStore.user.last_name
                  }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-1 basis-1/3">
                <div class="flex items-center gap-2 badge rounded p-4 shadow w-full">
                  Email:
                  <span class="badge badge-outline rounded">{{
                    userStore.user.email
                  }}</span>
                </div>
              </div>
              <div class="flex flex-col gap-1 basis-1/3">
                <div class="flex items-center gap-2 badge rounded p-4 shadow w-full">
                  Inscrit le:
                  <span class="badge badge-outline rounded">{{
                    dateToLocaleString(userStore.user.date_joined)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CardSection from "~/components/card/CardSection.vue";

const userStore = useUserStore();

const dateToLocaleString = (date: string) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString('fr-FR');
};
</script>
