<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <div class="min-w-full shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full">
          <thead>
            <tr>
              <th v-for="_ in 10" :class="`px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider ${coreStore.theme === 'light' ? 'bg-gray-200' : 'bg-base-200'}`">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="_ in 5">
              <td v-for="_ in 10" class="px-6 py-4 whitespace-no-wrap">
                <div :class="`h-4 rounded animate-pulse ${coreStore.theme === 'light' ? 'bg-gray-300' : 'bg-base-300'}`"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const coreStore = useCoreStore()

const props = defineProps<{
  loadingMessage?: string
}>()
</script>