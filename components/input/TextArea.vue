<template>
  <textarea v-model="modelValue" class="textarea textarea-bordered" :placeholder="props.placeholder"></textarea>
</template>

<script setup lang="ts">

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>