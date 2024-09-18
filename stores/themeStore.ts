import { defineStore } from "pinia";
export const useThemeStore = defineStore({
  id: "themeStore",
  state: () => ({
    name: 'default',
    current: '',
  }),
  actions: {
    toggleTheme() {
      this.current = this.current === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.current);
      const themeCookie = useCookie('theme');
      themeCookie.value = this.current;
    },
    initTheme() {
      console.log('initTheme');
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.current = theme;
      }
    }
  },
});
