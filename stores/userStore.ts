import { defineStore } from "pinia";
export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
  },
});
