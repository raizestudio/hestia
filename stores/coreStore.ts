import { defineStore } from "pinia";

import type { ConnectionInterface } from "~/interfaces/ConnectionInterface";
import type { MenuInterface } from "~/interfaces/CoreInterface";
import type {
  SettingsInterface,
  SettingInterface,
} from "~/interfaces/SettingInterface";
import type { NotificationInterface } from "~/interfaces/NotificationInterface";
import { useRuntimeConfig } from "#imports"

export const useCoreStore = defineStore({
  id: "coreStore",
  state: () => ({
    isLoading: true,
    connection: {
      status: "error",
      latency: 0,
    } as ConnectionInterface,
    settings: {} as SettingsInterface,
    loadingMessage: "Chargement...",
    mainContainerWidth: 0,
    mainContainerHeight: 0,
    hasNotification: true,
    notifications: [] as NotificationInterface[],
    userNotifications: [] as NotificationInterface[],
    showCookieBanner: false,
    theme: "light",
    menus: [] as MenuInterface[],
    runtimeConfig : useRuntimeConfig()
  }),
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
      localStorage.setItem("theme", theme);
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", this.theme);
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.theme = savedTheme;
      } else {
        this.theme = "light";
      }
      document.documentElement.setAttribute("data-theme", this.theme);
    },

    async fetchMenus() {
      const url = `${this.runtimeConfig.public.apiProtocol}://${this.runtimeConfig.public.apiBase}:${this.runtimeConfig.public.apiPort}/api/menus/user-menu`;

      const token = localStorage.getItem("token");
      const response: any = await $fetch(
        `${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.menus = response;
    },

    transformArrayToDict(array: { key: string; value: string }[]) {
      const result = {} as any;
      array.forEach((item) => {
        result[item.key] = item.value;
      });
      return result;
    },

    async fetchSettings() {
      const url = `${this.runtimeConfig.public.apiProtocol}://${this.runtimeConfig.public.apiBase}:${this.runtimeConfig.public.apiPort}/api/settings/`;
      const token = localStorage.getItem("token");
      try {
        const response: any = await $fetch(
          `${url}`,
        );
        // this.settings = this.transformArrayToDict(response);
        this.settings = response;
      } catch (error) {
        console.error(error);
        this.hasNotification = true;
        this.addNotification({
          id: "0",
          type: "error",
          message: "Une erreur s'est produit lors de l'initialization!",
          title: "Erreur",
          isRead: false,
          timestamp: new Date().toLocaleString(),
        });
        // throw createError({
        //   status: 500,
        //   statusText: "Une erreur s'est produit lors de l'initialization!",
        //   fatal: true
        // });
      }
    },

    async updateSetting(key: string, value: string | boolean) {
      const url = `${this.runtimeConfig.public.apiProtocol}://${this.runtimeConfig.public.apiBase}:${this.runtimeConfig.public.apiPort}/api/settings/${key}/`;
      const token = localStorage.getItem("token");
      const response: { key: "app_name" | "app_description"; value: string } =
        await $fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ key, value }),
        });
      this.settings[response.key] = response.value;
    },

    addNotification(notification: NotificationInterface) {
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications = this.notifications.filter(
          (n) => n.id !== notification.id
        );
      }, 5000);
    },
    toggleNotificationIsRead(id: string) {
      console.log("toggleNotificationIsRead", id);
      const notification = this.notifications.find(
        (notification) => notification.id === id
      );
      if (notification) {
        notification.isRead = !notification.isRead;
      }
    }
  },
});
