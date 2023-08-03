<template>

    <GamesTabulator ref="gamesTabulator" />

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import GamesTabulator from '@/components/games/GamesTabulator.vue'

export default defineComponent ({
    name: "GamesView",

    data() {
        return {
            
        }
    },

    components: {
        GamesTabulator
    },

})
</script>