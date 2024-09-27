<template>
  <span v-if="amount" class="text-nowrap"
    >
    {{ props.amount }} {{ props.currency.symbol }} {{ props.currency.taxe_included ? 'TTC' : 'HT' }}
  </span>
  <div v-else title="Durée non renseignée">
    <ExclamationCircle class="stroke-warning w-6 h-6" />
  </div>
</template>

<script setup lang="ts">

// Icons
import ExclamationCircle from "~/components/assets/icons/ExclamationCircle.vue";

const props = defineProps<{
  amount: string;
  currency: any;
}>();

</script>