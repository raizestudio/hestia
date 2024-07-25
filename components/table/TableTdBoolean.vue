<template>
  <CircleCheckIcon
    v-if="option"
    class="stroke-success"
  />
  <XCircleIcon v-else class="stroke-error" />
</template>

<script setup lang="ts">

// Icons
import CircleCheckIcon from "~/components/assets/icons/CircleCheckIcon.vue";
import XCircleIcon from "~/components/assets/icons/XCircleIcon.vue";
const props = defineProps<{
  option: Record<string, any>;
}>();
</script>