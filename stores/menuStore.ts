import { defineStore } from "pinia";
import { fetchMenus } from "@/composables/api/useMenu";

// Interfaces
// import { type AlertInterface } from "@/interfaces/stores/AlertStoreInterface";

export const useMenuStore = defineStore({
  id: "menuStore",
  state: () => ({
    menus: [] as any[],
  }),
  actions: {
    async getMenus() {
      this.menus = await fetchMenus();
    }
  },
});
