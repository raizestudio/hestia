<template>
  <label
    :class="`input input-bordered flex items-center gap-2 ${
      !isInputValid ? 'input-error' : 'input-success'
    }`"
  >
    <component :is="icon" />
    <input
      v-model="inputValue"
      :type="type"
      :class="class"
      :placeholder="placeholder"
      autofocus
      @keyup="handleKeyUp"
      @change="handleChange"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  type: string;
  class: string;
  placeholder: string;
  isInputValid: boolean;
  icon: Component;
  onKeyUp: () => void;
  onChange: () => void;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  inputValue.value = newValue;
});

const handleKeyUp = () => {
  emit("update:modelValue", inputValue.value);
  props.onKeyUp();
};

const handleChange = () => {
  emit("update:modelValue", inputValue.value);
  props.onChange();
};

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

</script>
