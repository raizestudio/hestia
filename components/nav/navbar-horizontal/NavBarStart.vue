<template>
  <div class="navbar-start">
    <div @click="$router.push('/')">
      <div class="cursor-pointer">
        <h1 class="text-xl font-black select-none">{{coreStore.settings.app_name}}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const coreStore = useCoreStore()
</script>