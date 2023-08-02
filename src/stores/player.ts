import { Player } from '@/models/PlayersModel'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
    state: () => {
        return {
            players: {} as Player[],
        }
    },
    // ----------------------------------------------------------------
    //								getters
    // ----------------------------------------------------------------
    getters: {
        playerList: (state) => state.players || [],
        count: (state) => state.players.length || 0,
    },
    actions: {
        
    },
})
