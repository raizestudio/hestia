<template>
  <div
    :class="
      clsx('relative flex items-center pl-5 pr-2 py-0.5 rounded cursor-pointer',
      themeStore.current === 'light' ? 'bg-dark-300' : 'bg-light-300')
    "
  >
    <AvatarComponent
      src="https://thispersonnotexist.org/downloadimage/Ac3RhdGljL21hbi9zZWVkNDk0NDIuanBlZw=="
      alt="user avatar"
      width-class="w-8"
      height-class="h-8"
      :class="clsx('absolute -top-1 -left-4 inset-2 border-2', themeStore.current === 'light' ? 'border-light-200' : 'border-dark-200')"
    />
    <span
      :class="
        clsx(
          'text-sm font-semibold',
          themeStore.current === 'light' ? 'text-light-100' : 'text-dark-100'
        )
      "
      >{{ userStore.user.username }}</span
    >
  </div>
</template>

<script setup lang="ts">
import clsx from "clsx";

// Components
import AvatarComponent from "@/components/avatar/AvatarComponent.vue";

// Stores
const userStore = useUserStore();
const themeStore = useThemeStore();
</script>
