import { defineStore } from 'pinia'

import type { MenuInterface } from '~/interfaces/CoreInterface'

export const useCoreStore = defineStore({
  id: 'coreStore',
  state: () => ({
    isLoading: true,
    loadingMessage: 'Chargement...',
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
    },

    async fetchMenus() {
      const token = localStorage.getItem('token')
      const response: any = await $fetch('http://localhost:8000/api/menus/user-menu', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.menus = response
    }
  }
})
