<template>
  <th class="hover:bg-base-300 cursor-pointer">
    <div class="flex justify-between ">
      <span>{{label}}</span>
      <SortIcon class="w-4 h-4" />
    </div>
  </th>
</template>

<script lang="ts" setup>
import SortIcon from '~/components/assets/icons/SortIcon.vue'

defineProps({
  label: String,
  hasIcon: {
    type: Boolean,
    default: true
  }
})

</script>