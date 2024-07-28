<template>
  <label class="form-control w-full max-w-md">
    <div class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <input v-model="props.modelValue" type="password" :name="props.name" :placeholder="props.placeholder" class="input input-sm input-bordered w-full max-w-md" />
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  modelValue: string;
  label?: string;
  name?: string;
  placeholder?: string;
}>();


const emit = defineEmits(['update:modelValue']);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>