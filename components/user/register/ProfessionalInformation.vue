<template>
  <div class="flex flex-col gap-2 mt-10 basis-1/2">
    <TextInput :model-value="props.a" label="Nom d'utilisateur" placeholder="jmartin01"/>

  </div>
</template>

<script setup lang="ts">

// Components
import PasswordInput from '~/components/input/PasswordInput.vue';
import TextInput from '~/components/input/TextInput.vue';

// Interfaces
import type { UserInterface } from '~/interfaces/UserInterface';

const props = defineProps<{
  a?: string;
}>();
</script>