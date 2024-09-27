<template>
  <NuxtLayout>
    <div>
      <SectionTitle title="Paramètres de l'application" />
      <div>
        {{ coreStore.settings }}
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Stores
const themeStore = useThemeStore();
const coreStore = useCoreStore();

// Components
import SectionTitle from '@/components/section/SectionTitle.vue';
</script>