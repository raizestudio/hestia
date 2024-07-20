<template>
  <div class="toast mb-6 w-80">
    <div role="alert" class="bg-base-200 shadow px-4 py-2 border-t-2 border-error">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center gap-2">
          <ErrorIcon class="w-6 h-6 stroke-error" />
          <span class="text-md">{{ props.title }}</span>
        </div>
        <div>
          <div class="my-2">
            <span class="text-sm">{{props.message}}</span>
          </div>
        </div>
        <div class="flex justify-between items-center gap-1">
          <span class="text-xs">{{ props.timestamp }}</span>
          <button class="btn btn-xs btn-primary" @click="() => coreStore.toggleNotificationIsRead(props.id)">Accepter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Icons
import ErrorIcon from '@/components/assets/icons/ErrorIcon.vue'

const coreStore = useCoreStore()

const props = defineProps<{
  id: string,
  title: string,
  message: string
  timestamp: string
}>()
</script>