<template>
  <div>
    <label
      v-if="props.label"
      :for="props.name"
      :class="`font-semibold ${ themeStore.current === 'light' ? 'text-dark-200' : 'text-light-200'} ${props.labelClasses || 'text-sm'}`"
      >{{ props.label }}</label
    >
    <input
      v-model="props.modelValue"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :class="`w-full px-2 rounded border-none outline-none ${ themeStore.current === 'light' ? 'bg-light-300 text-dark-300' : 'bg-dark-300 text-light-300'} ${props.inputClasses}`"
    />
  </div>
</template>

<script setup lang="ts">

// Stores
const themeStore = useThemeStore();

const props = defineProps<{
  id?: string;
  name: string;
  label?: string;
  labelClasses?: string;
  modelValue: string;
  inputClasses?: string;
  type: string;
  placeholder: string;
}>();
</script>
