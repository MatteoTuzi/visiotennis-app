import { GameResponse } from '@/models/GamesModel'
import { defineStore } from 'pinia'
import axios from 'axios'
import { constants } from '@/constants'
import dayjs from 'dayjs'

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            games: {} as GameResponse[],
        }
    },
    // ----------------------------------------------------------------
    //								getters
    // ----------------------------------------------------------------
    getters: {
        gameList: (state) => state.games || [],
        fastestGame: (state) => {
            let fastestGame = state.games[0]
            state.games.forEach( (game) => {
                if (dayjs(game.attributes.match_end_time).diff(game.attributes.match_start_time) < dayjs(fastestGame.attributes.match_end_time).diff(fastestGame.attributes.match_start_time)) {
                    fastestGame = game
                }
            })
            return fastestGame
        },
    },
    actions: {
        async getAllGames() {
            return new Promise( (resolve, reject) => {
                axios.get(constants.api.strapi.games + "?populate=*")
                .then( (response) => {
                    this.games = response.data 
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    },
})
