import { defineStore } from "pinia";

// Interfaces
import { type DRFInterface } from "@/interfaces/api/DRFInterface";
import { type ServiceInterface } from "@/interfaces/ServiceInterface";

// Composables
import { fetchServices } from "@/composables/api/useService";

export const useServicesStore = defineStore({
  id: "servicesStore",
  state: () => ({
    services: [] as ServiceInterface[],
    fakeServices: [] as any[],
    next: '',
    prev: '',
  }),
  actions: {
    async getServices() {
      const response: DRFInterface = await fetchServices();
      this.services = response.results;
      this.next = response.next ?? '';
      this.prev = response.previous ?? '';
    },
  },
});
