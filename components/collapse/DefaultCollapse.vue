<template>
  <div class="collapse collapse-arrow bg-base-200 max-w-full overflow-x-scroll">
    <input type="checkbox" :checked="checked" />
    <div class="collapse-title text-xl font-bold">{{title}}</div>
    <div class="collapse-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  checked?: boolean;
}>();
</script>