<template>
  <NuxtLayout>
    <SectionFullScreen>
      <div class="">
        <h1 class="text-3xl font-black">Accueil</h1>
      </div>
    </SectionFullScreen>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import pkg from '~/package.json';
import _ from 'lodash';

onMounted(() => {
  document.title = `${_.capitalize(pkg.name)}`;
})

definePageMeta({
  title: 'Accueil',
  description: 'Page d\'accueil',
  layout: 'anonymous'
})
</script>