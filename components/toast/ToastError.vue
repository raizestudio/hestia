<template>
  <div class="toast mb-6 w-80">
    <div role="alert" :class="`bg-base-200 shadow px-4 py-2 border-t-2 ${getBorderColor}`">
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center gap-2">
          <ErrorIcon v-if="props.type === 'error'" class="w-6 h-6 stroke-error" />
          <CircleCheckIcon v-if="props.type === 'success'" class="w-6 h-6 stroke-success" />
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
import { ref, computed } from 'vue'

// Icons
import ErrorIcon from '~/components/assets/icons/ErrorIcon.vue'
import CircleCheckIcon from '~/components/assets/icons/CircleCheckIcon.vue';

const coreStore = useCoreStore()

const props = defineProps<{
  id: string,
  title: string,
  message: string
  timestamp: string
  type: 'error' | 'success' | 'info' | 'warning' | ''
}>()

const getBackgroundColor = computed(() => {
  switch (props.type) {
    case 'error':
      return 'bg-error'
    case 'success':
      return 'bg-success'
    case 'info':
      return 'bg-info'
    case 'warning':
      return 'bg-warning'
    default:
      return 'bg-base-200'
  }
})

const getBorderColor = computed(() => {
  switch (props.type) {
    case 'error':
      return 'border-error'
    case 'success':
      return 'border-success'
    case 'info':
      return 'border-info'
    case 'warning':
      return 'border-warning'
    default:
      return 'border-base-200'
  }
})
</script>