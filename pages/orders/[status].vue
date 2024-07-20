<template>
  <NuxtLayout>
    <CardSection>
      <SectionFullScreen>
        <div ref="containerRef" class="flex flex-col h-full grow">
          <div class="flex items-end">
            <div class="grow">
              <h2 class="text-2xl font-bold">Demandes</h2>
              <p class="text-sm opacity-50">
                Mes demandes en cours
              </p>
            </div>
          </div>
        </div>
      </SectionFullScreen>
    </CardSection>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// Components
import CardSection from "~/components/card/CardSection.vue";
import SectionFullScreen from "~/components/section/SectionFullScreen.vue";
</script>
