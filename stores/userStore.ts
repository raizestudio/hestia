import { defineStore } from 'pinia'
import type { UserInterface } from '~/interfaces/UserInterface'
import type { SessionInterface } from '~/interfaces/SessionInterface'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    isLogged: false,
    user: {} as UserInterface,
    session: {} as SessionInterface
  }),
  actions: {
    async authenticate(username: string, password: string) {
      const response: any = await $fetch('http://localhost:8000/api/authentication/sessions/authenticate/', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      })
      console.log(response)
      localStorage.setItem('token', response.token)
      localStorage.setItem('refresh', response.refresh)
      this.user = response.user
      this.session = response.session
      this.isLogged = true
    },
    async retrieveSessionFromToken() {
      const token = localStorage.getItem('token')
      try {
        const response: any = await $fetch('http://localhost:8000/api/authentication/sessions/retrieve-from-token/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.user
        this.session = response.session
        this.isLogged = true
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
      }
    },
    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      this.isLogged = false
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
    }
  }
})
