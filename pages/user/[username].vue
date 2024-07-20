<template>
  <NuxtLayout>
    <CardSection>
      <ViewUser :username="String(route.params.username)" />
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CardSection from "~/components/card/CardSection.vue";

// Components
import ViewUser from "~/components/user/ViewUser.vue";

const route = useRoute();

definePageMeta({
  title: "Utilisateur",
  description: "Profil utilisateur",
  middleware: "auth",
});
</script>
