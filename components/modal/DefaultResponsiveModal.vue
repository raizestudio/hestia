<template>
  <dialog :id="props.id" :class="`modal ${dialogClass}`">
    <div :class="`modal-box w-11/12 ${boxClass}`">
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">

const props = defineProps<{
  id: string
  dialogClass?: string
  boxClass?: string
}>()
</script>