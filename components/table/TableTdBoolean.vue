<template>
  <CheckCircleIcon
    v-if="option"
    class="fill-success-100 w-6 h-6"
  />
  <CloseCircleIcon v-else class="fill-danger-100 w-6 h-6" />
</template>

<script setup lang="ts">

// Icons
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import CloseCircleIcon from "@/components/icons/CloseCircleIcon.vue";

const props = defineProps<{
  option: Record<string, any>;
}>();
</script>