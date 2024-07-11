<template>
  <th :class="`hover:bg-base-300 cursor-pointer`" @click="toggleSort">
    <div class="flex justify-between ">
      <span class="select-none">{{label}}</span>
      <SortAscendingIcon v-if="isAscending" class="w-4 h-4" />
      <SortDescendingIcon v-else class="w-4 h-4" />
    </div>
  </th>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import SortAscendingIcon from '~/components/assets/icons/SortAscendingIcon.vue'
import SortDescendingIcon from '../assets/icons/SortDescendingIcon.vue';

const isAscending = ref(false)

const toggleSort = () => {
  isAscending.value = !isAscending.value
}

defineProps({
  label: String,
  hasIcon: {
    type: Boolean,
    default: true
  }
})

</script>