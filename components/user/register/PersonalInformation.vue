<template>
  <div class="flex flex-col gap-2 mt-10 basis-1/2">
    <TextInput :model-value="props.user.username" label="Nom d'utilisateur" placeholder="jmartin01"/>
    <TextInput :model-value="props.user.first_name" label="Prénom" placeholder="Johnathan"/>
    <TextInput :model-value="props.user.last_name" label="Nom" placeholder="Martin"/>
    <PasswordInput :model-value="props.user.password" label="Mot de passe"/>
    <PasswordInput :model-value="props.user.password" label="Confirmation mot de passe"/>
  </div>
</template>

<script setup lang="ts">

// Components
import PasswordInput from '~/components/input/PasswordInput.vue';
import TextInput from '~/components/input/TextInput.vue';

// Interfaces
import type { UserInterface } from '~/interfaces/UserInterface';

const props = defineProps<{
  user: UserInterface;
}>();
</script>