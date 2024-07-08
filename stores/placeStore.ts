import { defineStore } from 'pinia'

import type { PlaceInterface } from '~/interfaces/PlaceInterface'

export const useCoreStore = defineStore({
  id: 'coreStore',
  state: () => ({
    places: [] as PlaceInterface[],
  }),
  actions: {
  }
})
