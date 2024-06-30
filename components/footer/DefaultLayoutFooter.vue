<template>
  <footer class="footer bg-base-200 text-base-content items-center p-2">
    <aside class="grid-flow-col items-center">
      <p class="text-xs">Hestia {{new Date().getFullYear()}} - {{pkg.author}}</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end items-center">
      <span class="text-xs">Version {{pkg.version}}</span>
      <span class="badge badge-xs badge-success"></span>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
import pkg from '~/package.json'


</script>

<style>

</style>