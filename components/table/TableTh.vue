<template>
  <!-- <th :class="`${sort.field === field ? 'bg-base-300' : ''} hover:bg-base-300 cursor-pointer tracking-wider`" @click="toggleSort"> -->
  <th :class="clsx('cursor-pointer tracking-wider p-1', themeStore.current === 'light' ? 'hover:bg-light-300' : 'hover:bg-dark-300')">
    <div class="flex justify-between ">
      <span :class="clsx('select-none', themeStore.current === 'light' ? 'text-dark-100' : 'text-light-100')">{{label}}</span>
      <!-- <div v-if="sort.field === field"> -->
        <!-- <SortAscendingIcon v-if="sort.order === 'asc'" class="w-4 h-4" />
        <SortDescendingIcon v-else-if="sort.order === 'desc'" class="w-4 h-4" /> -->
      <!-- </div> -->
    </div>
  </th>
</template>

<script lang="ts" setup>
import clsx from 'clsx';
import { ref } from 'vue'

// import SortAscendingIcon from '~/components/assets/icons/SortAscendingIcon.vue'
// import SortDescendingIcon from '../assets/icons/SortDescendingIcon.vue';

// Stores
const themeStore = useThemeStore();

const isAscending = ref(false)

// const toggleSort = () => {
//   if (props.sort.field !== props.field) {
//     props.updateTableConfig(props.field, 'desc')
//     return
//   }
//   if (props.sort.order === 'desc') {
//     props.updateTableConfig(props.field, 'asc')
//   } else if (props.sort.order === 'asc') {
//     props.updateTableConfig('', '')
//   } else {
//     props.updateTableConfig(props.field, 'desc')
//   }
// }

const props = defineProps({
  label: String,
  field: String,
  sort: {
    type: {} as any,
    required: false
  },
  updateTableConfig: {
    type: Function,
    required: false
  }
})

</script>