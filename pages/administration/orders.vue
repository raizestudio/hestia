<template>
  <NuxtLayout>
    <CardSection>
      <SectionFullScreen>
        <div class="grow">
          <h2 class="text-2xl font-bold">Demandes</h2>
          <p class="text-sm opacity-50">
            Gestion des demandes soumises par les utilisateurs
          </p>
        </div>
      </SectionFullScreen>
    </CardSection>
  </NuxtLayout>
</template>

<script setup lang="ts">

// Components
import CardSection from "~/components/card/CardSection.vue";
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";

</script>