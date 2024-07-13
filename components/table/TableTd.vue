<template>
  <td>
      {{ props.field }}
      <slot />
  </td>
</template>

<script setup lang="ts">

const props = defineProps({
  field: {
    type: String,
    required: true
  },
})
</script>
