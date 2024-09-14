import { defineStore } from "pinia";
export const useThemeStore = defineStore({
  id: "themeStore",
  state: () => ({
    current: 'light',
  }),
  actions: {
    toggleTheme() {
      this.current = this.current === 'light' ? 'dark' : 'light';
    },
  },
});
