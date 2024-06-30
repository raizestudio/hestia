import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLogged: false,
    user: {
      name: '',
      email: ''
    }
  }),
  actions: {
    async authenticate(username: string, password: string) {
      const response = await $fetch('http://localhost:8000/api/authentication/authenticate/', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
      console.log(response)
      this.isLogged = true
    }
  }
})
