import { defineStore } from "pinia";

// Interfaces
import { type DRFInterface } from "@/interfaces/api/DRFInterface";


// Composables
import { fetchServices } from "@/composables/api/useService";

export const useOrderStore = defineStore({
  id: "orderStore",
  state: () => ({
    orders: [] as any[],
    fakeOrders: [] as any[]
  }),
  actions: {

  },
});
