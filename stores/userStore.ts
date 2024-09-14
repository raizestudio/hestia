import { defineStore } from "pinia";

// Interfaces
import type {  UserInterface } from "~/interfaces/UserInterface";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    isAuthenticated: false,
    sessionId: "",
    user: {} as UserInterface,
  }),
  actions: {
    setSessionId(sessionId: string) {
      this.sessionId = sessionId;
    }
  },
});
