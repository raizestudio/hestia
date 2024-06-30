<template>
  <footer class="footer bg-neutral text-neutral-content items-center p-4">
    <aside class="grid-flow-col items-center">
      <p>Hestia {{new Date().getFullYear()}} - {{pkg.author}}</p>
    </aside>
    <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end items-center">
      <span>Version {{pkg.version}}</span>
      <span class="badge badge-xs badge-success"></span>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
import pkg from '~/package.json'


</script>

<style>

</style>