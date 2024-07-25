<template>
  <label class="form-control w-full max-w-xs">
    <div class="label">
      <span class="label-text">{{ label }}</span>
    </div>
    <input v-model="modelValue" type="text" :placeholder="props.placeholder" class="input input-sm input-bordered w-full max-w-xs" />
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
}>();


const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>