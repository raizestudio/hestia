<template>
  <label class="form-control w-full max-w-md">
    <div class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <input
      v-model="inputValue"
      type="text"
      :name="props.name"
      :placeholder="props.placeholder"
      :class="`input input-sm input-bordered w-full max-w-md ${ props.saving ? 'input-disabled' : '' } ${ props.valid ? 'input-success' : '' }`"
      :disabled="props.saving"
      @change="handleChange"
    /> </label
  >
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  modelValue: string;
  label?: string;
  name: string;
  placeholder?: string;
  saving?: boolean;
  valid?: boolean;
  changeAction: (fieldName: string, field: string) => void;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal;
  }
);

const handleChange = () => {
  props.changeAction(props.name, inputValue.value);
  emit("update:modelValue", inputValue.value);
};
</script>
