<template>
  <div v-if="state" class="">
    <span v-if="props.state === 'draft'" class="flex justify-center rounded-sm bg-base-300 text-nowrap">
      Brouillon
    </span>
    <span v-if="props.state === 'open'" class="flex justify-center rounded-sm bg-info text-nowrap">
      Ouvert
    </span>
    <span v-if="props.state === 'awaiting'" class="flex justify-center rounded-sm bg-info text-nowrap">
      En attente
    </span>
    <span v-if="props.state === 'closed'" class="flex justify-center rounded-sm bg-success text-nowrap">
      Clôturé
    </span>
    <span v-if="props.state === 'halted'" class="flex justify-center rounded-sm bg-warning text-nowrap">
      Suspendu
    </span>
    <span v-if="props.state === 'cancelled'" class="flex justify-center rounded-sm bg-error text-nowrap">
      Annulé
    </span>
  </div>
  <div v-else title="Durée non renseignée">
    <ExclamationCircle class="stroke-warning w-6 h-6" />
  </div>
</template>

<script setup lang="ts">
// Icons
import ExclamationCircle from "~/components/assets/icons/ExclamationCircle.vue";

const props = defineProps<{
  state: string;
}>();
</script>
