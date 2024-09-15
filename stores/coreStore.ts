import { defineStore } from "pinia";

import { healthCheck } from "@/composables/api/useCore";
interface ApiHealthInterface {
  isUp: boolean;
  latency: number;
  lastFiveLatencies: number[];
}

export const useCoreStore = defineStore({
  id: "coreStore",
  state: () => ({
    isLoadingGlobal: true,
    isLoadingGlobalMessage: "",
    isLoadingLocal: false,  // Used for non blocking requests
    isLoadingLocalMessage: "",
    apiHealth: {
      isUp: false,
      latency: 0,
      lastFiveLatencies: [],
    } as ApiHealthInterface,
  }),
  actions: {
    setGlobalLoading(isLoading: boolean) {
      this.isLoadingGlobal = isLoading;
    },
    setApiHealthIsup(isUp: boolean) {
      this.apiHealth.isUp = isUp;
    },
    async updateHealthCheck() {
      const startTime = performance.now();
      const healthCheckResponse: any = await healthCheck();
      const endTime = performance.now();
      const latency = endTime - startTime;
      this.setApiHealthIsup(healthCheckResponse);
      this.apiHealth.lastFiveLatencies.length >= 5 && this.apiHealth.lastFiveLatencies.shift();
      this.apiHealth.lastFiveLatencies.push(latency);
      this.apiHealth.latency = Math.floor(this.apiHealth.lastFiveLatencies.reduce((a, b) => a + b, 0) / this.apiHealth.lastFiveLatencies.length);
      
    }
  },
});
