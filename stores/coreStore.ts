import { defineStore } from 'pinia'

import type { ConnectionInterface } from '~/interfaces/ConnectionInterface'
import type { MenuInterface } from '~/interfaces/CoreInterface'
import type { SettingsInterface } from '~/interfaces/SettingInterface'

export const useCoreStore = defineStore({
  id: 'coreStore',
  state: () => ({
    isLoading: true,
    connection: {
      status: 'error',
      latency: 0
    } as ConnectionInterface,
    settings: {} as SettingsInterface,
    loadingMessage: 'Chargement...',
    hasNotification: false,
    notifications: [] as any[],
    showCookieBanner: false,
    theme: 'light',
    menus: [] as MenuInterface[]
  }),
  actions: {

    setTheme(theme: string) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', this.theme)
    },

    initializeTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.theme = savedTheme
      } else {
        this.theme = 'light'
      }
      document.documentElement.setAttribute('data-theme', this.theme)
    },

    async fetchMenus() {
      const token = localStorage.getItem('token')
      const response: any = await $fetch('http://localhost:8000/api/menus/user-menu', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.menus = response
    },

    transformArrayToDict(array: {key: string, value: string}[]) {
      const result = {} as any;
      array.forEach(item => {
        if (item.value.toLowerCase() === 'true') {
          result[item.key] = true;
        } else if (item.value.toLowerCase() === 'false') {
          result[item.key] = false;
        } else {
          result[item.key] = item.value;
        }
      });
      return result;
    },

    async fetchSettings() {
      const token = localStorage.getItem('token')
      const response: any = await $fetch('http://localhost:8000/api/settings');
      this.settings = this.transformArrayToDict(response)
    }
  }
})
