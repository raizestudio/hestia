import { defineStore } from "pinia";

// Interfaces
import type { UserInterface } from "@/interfaces/UserInterface";

// Composables
import { authenticate } from "@/composables/api/useAuth";
import { getSessionId, retrieveSessionFromToken } from "~/composables/api/useSession";

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
    async getSession() {
      const response: any = await getSessionId();
      this.sessionId = response;
    },
    async validateCurrentSession() {
      const token: string | null = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage.");
      }
      const response: any = await retrieveSessionFromToken();
      this.user = response.user;
      this.sessionId = response.session;
      this.token = response.token;
      this.refresh = response.refresh;
      this.isAuthenticated = true;
    },
    async logout() {
      this.isAuthenticated = false;
      this.user = {} as UserInterface;
      this.token = "";
      this.refresh = "";
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
    }
  },
});
