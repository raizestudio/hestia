<template>
  <DropdownComponent v-on-click-outside="notificationStore.hideNotification">
    <template v-slot:trigger>
      <div
        :class="`relative cursor-pointer rounded-full p-1 ${
          themeStore.current === 'light'
            ? 'hover:bg-light-300'
            : 'hover:bg-dark-300'
        }`"
        @click="notificationStore.toggleShowNotification"
      >
        <BellIcon
          :class="`w-6 transition-colors duration-300 ease-in-out ${
            themeStore.current === 'light' ? 'fill-dark-300' : 'fill-light-300'
          }`"
          ball-classes="fill-success-100"
        />
        <CircleComponent class="absolute top-1.5 right-1.5 shadow" height-class="h-2" width-class="w-2" />
      </div>
    </template>
    <template v-slot:content>
      <NotificationDropdownContent v-if="notificationStore.showNotification" />
    </template>
  </DropdownComponent>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { vOnClickOutside } from '@vueuse/components'

// Components
import DropdownComponent from "@/components/dropdown/DropdownComponent.vue";
import NotificationDropdownContent from "@/components/notification/NotificationDropdownContent.vue";
import CircleComponent from "@/components/shape/CircleComponent.vue";

// Icons
import BellIcon from "@/components/icons/BellIcon.vue";

// Stores
const themeStore = useThemeStore();
const notificationStore = useNotificationStore();
</script>


