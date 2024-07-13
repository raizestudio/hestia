<template>
  <div class="toast mb-6 w-80">
    <div role="alert" class="bg-base-200 shadow px-4 py-2">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-error h-5 w-5 shrink-0">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-md">Une erreur s'est produit.</span>
        </div>
        <div>
          <div>
            <span class="text-sm">erreur</span>
          </div>
        </div>
        <div class="flex justify-end items-center gap-1">
          <button class="btn btn-xs">Deny</button>
          <button class="btn btn-xs btn-primary">Accept</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>