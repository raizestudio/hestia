import { defineStore } from "pinia";

// Interfaces
import { type NotificationInterface } from "@/interfaces/stores/NotificationStoreInterface";

export const useModalStore = defineStore({
  id: "modalStore",
  state: () => ({
    showCreateModal: false,
  }),
  actions: {
    toggleCreateModal() {
      this.showCreateModal = !this.showCreateModal;
    },
  },
});
