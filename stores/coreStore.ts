import { defineStore } from 'pinia'

export const useCoreStore = defineStore({
  id: 'coreStore',
  state: () => ({
    theme: 'light'
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
    }
  }
})
