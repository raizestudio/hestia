<template>
  <div class="flex">
    <span v-if="userType === 'user'">Explanation of user type</span>
    <span v-else-if="userType === 'agency'">Explanation of agency type</span>
    <span v-else-if="userType === 'independent'">Explanation of independent type</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  userType: string;
}>();
</script>