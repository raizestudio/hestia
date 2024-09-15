<template>
  <div class="flex flex-col gap-0.5">
    <label
      v-if="props.label"
      :for="props.name"
      :class="clsx('font-semibold', themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200', props.labelClasses || 'text-sm')"
    >{{ props.label }}</label>
    <input
      v-model="props.modelValue"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :class="`w-full px-2 rounded border-none outline-none ${
        themeStore.current === 'light'
          ? 'bg-light-300 text-dark-300'
          : 'bg-dark-300 text-light-300'
      } ${props.inputClasses}`"
    />
  </div>
</template>

<script setup lang="ts">
import clsx from 'clsx';

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  id?: string;
  name: string;
  label?: string;
  labelClasses?: string;
  modelValue: string;
  inputClasses?: string;
  type?: string;
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: InputEvent) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
