import { PersistStorage } from 'zustand/middleware'
import { UserState } from './states/user-state'

export const createCustomStorage = (): PersistStorage<UserState> => ({
  getItem: (name) => {
    const str = localStorage.getItem(name)
    return str ? JSON.parse(str) : null
  },
  setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
  removeItem: (name) => localStorage.removeItem(name),
})