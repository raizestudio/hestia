<template>
  <select class="select select-sm select-bordered w-full max-w-xs">
    <option disabled selected>{{ emptyOption ? emptyOption : '--------'}}</option>
    <option v-for="option, index in props.options" :key="index" :value="option.value" @click="() => updateUserType(option.value)">{{ option.label }}</option>
  </select>
</template>

<script setup lang="ts">

const props = defineProps<{
  options: any[];
  emptyOption?: string;
  updateUserType: (value: string) => void;
}>();
</script>