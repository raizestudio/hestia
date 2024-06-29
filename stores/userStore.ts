import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLogged: false,
    user: {
      name: 'Eduardo',
      email: ''
    }
  }),
  actions: {
    async authenticate(username: string, password: string) {
      this.isLogged = true
    }
  }
})
