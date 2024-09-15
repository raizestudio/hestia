<template>
  <div>
    <NotificationDropdownEmpty v-if="notificationStore.notifications.length === 0" />
    <div v-else>
      <div class="py-2">
        <NotificationItem />
      </div>
      <a
        href="#"
        class="block py-2 font-bold text-center text-white bg-primary-100 hover:underline"
        >See all notifications</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import NotificationItem from "./NotificationDropdownItem.vue";
import NotificationDropdownEmpty from "./NotificationDropdownEmpty.vue";

// Stores
const notificationStore = useNotificationStore();
</script>
