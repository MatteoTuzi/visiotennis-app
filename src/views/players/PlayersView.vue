<template>

    <PlayersTabulator ref="playersTabulator" />

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import PlayersTabulator from '@/components/players/PlayersTabulator.vue'

export default defineComponent ({
    name: "PlayersView",

    data() {
        return {
            
        }
    },

    components: {
        PlayersTabulator
    },

})
</script>