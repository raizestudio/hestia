<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">{{ props.label }}</span>
      <input type="checkbox" :checked="isChecked" class="checkbox" />
    </label>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  label?: string;
  isChecked?: boolean;
}>();
</script>