<template>
  <div class="flex">
    <div v-if="userType === 'user'">
      <h3 class="text-xl font-semibold">En tant qu'utilisateur vous pouvez: </h3>
      <span>Demander des services</span>
    </div>
    <div v-if="userType === 'agency'">
      <h3 class="text-xl font-semibold">En tant qu'agence vous pouvez: </h3>
      <span>Demander des services</span>
      <span>Réaliser des services</span>
    </div>
    <div v-if="userType === 'independent'">
      <h3 class="text-xl font-semibold">En tant qu'auto entrepreneur vous pouvez: </h3>
      <span>Réaliser des services</span>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  userType: string;
}>();
</script>