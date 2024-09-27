<template>
  <span v-if="arr" class="text-nowrap">
    {{ props.arr.length }}
  </span>
  <div v-else title="Durée non renseignée">
    <ExclamationCircle class="stroke-warning w-6 h-6" />
  </div>
</template>

<script setup lang="ts">
// Icons
import ExclamationCircle from "~/components/assets/icons/ExclamationCircle.vue";

const props = defineProps<{
  arr: any;
  field: string;
}>();
</script>
