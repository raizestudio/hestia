import { defineStore } from "pinia";

// Interfaces
import type { UserInterface } from "@/interfaces/UserInterface";

// Composables
import { authenticate } from "@/composables/api/useAuth";
import { retrieveSessionFromToken } from "~/composables/api/useSession";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    isAuthenticated: false,
    sessionId: "",
    user: {} as UserInterface,
    token: "",
    refresh: "",
  }),
  actions: {
    setSessionId(sessionId: string) {
      this.sessionId = sessionId;
    },
    async handleAuthentication(username: string, password: string) {
      console.log(`username: ${username}, password: ${password}`);
      try {
        const response: any = await authenticate(username, password);
        this.user = response.user;
        this.token = response.token;
        this.refresh = response.refresh;
        localStorage.setItem("token", this.token);
        localStorage.setItem("refresh", this.refresh);
        this.isAuthenticated = true;
      } catch (error) {}
    },
    async validateCurrentSession() {
      const response: any = await retrieveSessionFromToken();
      this.user = response.user;
      this.token = response.token;
      this.refresh = response.refresh;
      this.isAuthenticated = true;
    },
  },
});
