<template>
  <div class="flex items-center gap-3">
    <DefaultAvatar
      :avatar="props.avatar || ''"
      :label="props.label || ''"
      :user-first-name="userFirstName"
      :user-last-name="userLastName"
      :mask-class="maskClass || 'h-12 w-12'"
    />
    <div>
      <div class="font-bold">{{ label }}</div>
      <div class="text-sm opacity-50">{{ extraLabel }}</div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
// Components
import DefaultAvatar from "~/components/user/DefaultAvatar.vue";

const props = defineProps<{
  avatar: string;
  label?: string;
  extraLabel?: string;
  userFirstName?: string;
  userLastName?: string;
  maskClass?: string;
}>();
</script>
