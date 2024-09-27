<template>
  <div
    v-if="option[labelKey]"
    :class="`flex gap-1`"
  >
    <span
      v-if="option[labelKey].country.length > 0"
      :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap text-base-100 bg-info`"
    >
      <span
        >Pays</span
      >
    </span>
    <span
      v-if="option[labelKey].city.length > 0"
      :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap text-base-100 bg-warning`"
    >
      <span
        >Ville</span
      >
    </span>
  </div>
  <span
    v-else
    :class="`px-1 py-0.5 rounded-lg text-sm text-nowrap text-accent-content bg-primary`"
    >Universel</span
  >
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  option: any;
  labelKey: any;
}>();

const scopeToWord = computed(() => {
  // return props.option[props.labelKey].
  if (props.option[props.labelKey].city.length > 0) {
    return 'Ville';
  } else if (props.option[props.labelKey].country.length > 0) {
    return 'Pays';
  } else {
    return '';
  }
});

const scopeToColor = computed(() => {
  if (props.option[props.labelKey].city.length > 0) {
    return 'bg-warning';
  } else if (props.option[props.labelKey].country.length > 0) {
    return 'bg-info';
  } else {
    return 'bg-primary';
  }
});
</script>