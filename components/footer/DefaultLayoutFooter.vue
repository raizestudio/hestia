<template>
  <div class="flex flex-col">
    <footer class="footer bg-base-200 text-base-content items-center p-2">
      <div class="grid-flow-col items-center">
        <p class="text-xs">Hestia {{new Date().getFullYear()}} - {{pkg.author}}</p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end items-center">
        <span class="text-xs">Version {{pkg.version}}</span>
        <span :class="`badge badge-sm ${badgeColor}`">{{coreStore.connection.latency > 0 ? coreStore.connection.latency : '-' }}</span>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import pkg from '~/package.json'

import type { ConnectionInterface } from '~/interfaces/ConnectionInterface';

const coreStore = useCoreStore()

const badgeColor = computed(() => {
  switch (coreStore.connection.status) {
    case 'success':
      return 'badge-success'
    case 'warning':
      return 'badge-warning'
    case 'error':
      return 'badge-error'
    default:
      return 'badge-outline'
  }
})
</script>