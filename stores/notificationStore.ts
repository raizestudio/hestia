import { defineStore } from "pinia";

// Interfaces
import { type NotificationInterface } from "@/interfaces/stores/NotificationStoreInterface";

export const useNotificationStore = defineStore({
  id: "notificationStore",
  state: () => ({
    showNotification: false,
    notifications: [] as NotificationInterface[],
  }),
  actions: {
    toggleShowNotification() {
      this.showNotification = !this.showNotification;
    },
    hideNotification() {
      this.showNotification = false;
    }
  },
});
