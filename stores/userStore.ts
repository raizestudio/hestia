import { defineStore } from "pinia";
import type { UserInterface } from "~/interfaces/UserInterface";
import type { SessionInterface } from "~/interfaces/SessionInterface";
import { useRuntimeConfig } from "#imports"
export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    isLogged: false,
    user: {} as UserInterface,
    session: {} as SessionInterface,
    runtimeConfig : useRuntimeConfig()
  }),
  actions: {
    async authenticate(username: string, password: string) {
      const url = `${this.runtimeConfig.public.apiProtocol}://${this.runtimeConfig.public.apiBase}:${this.runtimeConfig.public.apiPort}/api/authentication`;
      try {
        const response: any = await $fetch(
          url,
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
          }
        );
        localStorage.setItem("token", response.token);
        localStorage.setItem("refresh", response.refresh);
        this.user = response.user;
        this.session = response.session;
        this.isLogged = true;

        return response;
      } catch (error: any) {
        if (error.statusCode === 404) {
          return { error: true, title: "Attention", message: "Nom d'utilisateur ou mot de passe invalide" };
        } else {
          return { error: true, title: "Erreur", message: "Une erreur s'est produit." };
        }
      }
    },
    async retrieveSessionFromToken() {
      const url = `${this.runtimeConfig.public.apiProtocol}://${this.runtimeConfig.public.apiBase}:${this.runtimeConfig.public.apiPort}/api/authentication/sessions/retrieve-from-token/`;
      const token = localStorage.getItem("token");
      try {
        const response: any = await $fetch(
          url,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.user = response.user;
        this.session = response.session;
        this.isLogged = true;
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
      }
    },
    async logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      this.isLogged = false;
      // const token = localStorage.getItem('token')
      // const refresh = localStorage.getItem('refresh')
      // try {
      //   await $fetch('http://localhost:8000/api/authentication/sessions/logout/', {
      //     method: 'POST',
      //     headers: {
      //       Authorization: `Bearer ${token}`
      //     }
      //   });
      //   localStorage.removeItem('token')
      //   localStorage.removeItem('refresh')
      //   this.isLogged = false
      // } catch (error) {
      //   console.log(error)
      // }
    },
  },
});
