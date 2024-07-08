import { defineStore } from 'pinia'

import type { ServiceInterface } from '~/interfaces/ServiceInterface'

export const useCoreStore = defineStore({
  id: 'coreStore',
  state: () => ({
    services: [] as ServiceInterface[],
  }),
  actions: {
  }
})
