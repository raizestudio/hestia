import { defineStore } from "pinia";

// Interfaces
import { type AlertInterface } from "@/interfaces/stores/AlertStoreInterface";

export const useAlertStore = defineStore({
  id: "alertStore",
  state: () => ({
    showAlert: false,
    alerts: [] as AlertInterface[],
  }),
  actions: {
  },
});
