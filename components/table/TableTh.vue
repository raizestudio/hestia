<template>
  <th :class="`${sort.field === field ? 'bg-base-300' : ''} hover:bg-base-300 cursor-pointer tracking-wider`" @click="toggleSort">
    <div class="flex justify-between ">
      <span class="select-none">{{label}}</span>
      <div v-if="sort.field === field">
        <SortAscendingIcon v-if="sort.order === 'asc'" class="w-4 h-4" />
        <SortDescendingIcon v-else-if="sort.order === 'desc'" class="w-4 h-4" />
      </div>
    </div>
  </th>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import SortAscendingIcon from '~/components/assets/icons/SortAscendingIcon.vue'
import SortDescendingIcon from '../assets/icons/SortDescendingIcon.vue';

const isAscending = ref(false)

const toggleSort = () => {
  if (props.sort.field !== props.field) {
    props.updateTableConfig(props.field, 'desc')
    return
  }
  if (props.sort.order === 'desc') {
    props.updateTableConfig(props.field, 'asc')
  } else if (props.sort.order === 'asc') {
    props.updateTableConfig('', '')
  } else {
    props.updateTableConfig(props.field, 'desc')
  }
}

const props = defineProps({
  label: String,
  field: String,
  sort: {
    type: {} as any,
    required: false
  },
  updateTableConfig: {
    type: Function,
    required: true
  }
})

</script>