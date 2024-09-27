import { defineStore } from "pinia";
import { fetchMenus } from "@/composables/api/useMenu";

// Interfaces
// import { type AlertInterface } from "@/interfaces/stores/AlertStoreInterface";

export const useMenuStore = defineStore({
  id: "menuStore",
  state: () => ({
    menus: [] as any[],
    activeMenu: '',
    activeSubMenu: '',
    isCollapsed: false,
  }),
  actions: {
    async getMenus() {
      this.menus = await fetchMenus();
    },
    setActiveMenu(menu: string) {
      this.activeMenu = menu;
    },
    setActiveSubMenu(subMenu: string) {
      this.activeSubMenu = subMenu;
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }
  },
});
