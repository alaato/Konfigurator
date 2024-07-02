import { defineStore } from 'pinia'

export const useVisitedStore = defineStore('visited', () => {
    const visited = ref(["Anforderungen"])
    return { visited }
})
