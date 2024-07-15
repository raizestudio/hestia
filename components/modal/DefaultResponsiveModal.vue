<template>
  <dialog id="responsive_modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
</script>