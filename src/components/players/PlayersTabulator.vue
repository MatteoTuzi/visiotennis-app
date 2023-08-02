<template>
    <div>
        <h3 class="text-3xl font-medium text-gray-700">
            Giocatori
        </h3>

        <div class="mt-8">

            <div class="mt-6">

                <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        User
                                    </th>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Role
                                    </th>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Created at
                                    </th>
                                    <th
                                        class="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- <tr v-for="(u, index) in players" :key="index">
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 w-10 h-10">
                                                <img class="w-full h-full rounded-full" :src="u.picture" alt="profile pic">
                                            </div>

                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-nowrap">
                                                    {{ u.name }}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ u.role }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <p class="text-gray-900 whitespace-nowrap">
                                            {{ u.created }}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                        <span
                                            :class="`relative inline-block px-3 py-1 font-semibold text-${u.statusColor}-900 leading-tight`">
                                            <span aria-hidden
                                                :class="`absolute inset-0 bg-${u.statusColor}-200 opacity-50 rounded-full`" />
                                            <span class="relative">{{ u.status }}</span>
                                        </span>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                        <div class="flex flex-col items-center px-5 py-5 bg-white border-t xs:flex-row xs:justify-between">
                            <div class="tabulator-footer">
                                <div class="tabulator-footer-contents">

                                    <span class="tabulator-paginator">
                                        <label>Pagina</label>

                                        <select class="tabulator-page-size" title="$t('message.tabulator.pageSize')"
                                            v-model="pageSize" @change="onChangeTake">
                                            <option v-for="(value, key) in paginationSizeSelector" :key="key"
                                                :value="value"> {{ value }}</option>
                                        </select>

                                        <div class="mr-5 dark:text-white">
                                            <label> Elementi 1 di 1 - 1</label>
                                        </div>

                                        <button class="tabulator-page" type="button" role="button"
                                            aria-label="$t('message.tabulator.pagePrevious')"
                                            title="$t('message.tabulator.pagePrevious')" data-page="prev"
                                            :disabled="currentPage == 1" @click="previousPage()">
                                            Prev
                                        </button>

                                        <span class="tabulator-pages">
                                            <button class="tabulator-page active" type="button" role="button"
                                                aria-label="$t('message.tabulator.pageNumber', { page: currentPage })"
                                                title="$t('message.tabulator.pageNumber', { page: currentPage })"
                                                :data-page="currentPage">
                                                {{ currentPage }}
                                            </button>
                                        </span>
                                        
                                        <button class="tabulator-page" type="button" role="button"
                                            aria-label="$t('message.tabulator.pageNext')"
                                            title="$t('message.tabulator.pageNext')" data-page="next"
                                            :disabled="handleNextPageDisabled()" @click="nextPage()">
                                            Succ
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePlayerStore } from '@/stores/player'
import dayjs from 'dayjs';

export default defineComponent({
    name: "PlayersTabulator",

    data() {
        return {
            // ! User store
            playersStore: usePlayerStore(),
            // ! Selected item from the table to be used in the modal
            // ! Tabulator instance
            // ! alert message
            messageAlert: {} as string,
            // ! loading variable to show the loading icon
            isLoading: false,
            // ! tabulator variable to show the tabulator
            hideTabulator: false,
            // ! tabulator variable to show the tabulator footer
            hideTabulatorFooter: false,

            // ! pagination variables
            paginationSizeSelector: [10, 15, 30, 50],
            pageSize: 10,
            take: 10,
            startingElements: 0,
            shownElements: 0,
            currentPage: 1,
            totalElements: 0,
            offset: 0
        }
    },

    methods: {
        /**
         * @description used to disable the next page button
         */
        handleNextPageDisabled() {
            return this.currentPage * this.take >= this.totalElements
        },
        /**
         * @description used to change the take variable for the tabulator
         */
        setTake() {
            this.take = this.playersStore.count < this.take ? this.playersStore.count : this.take
        },

        /**
         * @description used to change the pagination variables for the tabulator
         */
        changePaginationVariables() {
            this.totalElements = this.playersStore.count
            this.shownElements = this.playersStore.playerList.length + this.offset < this.totalElements ? this.playersStore.playerList.length + this.offset : this.totalElements
            this.startingElements = ((this.currentPage - 1) * this.pageSize) + 1
            this.setTake()
        },

        /**
         * @description used to reset the pagination variables for the tabulator
         */
        resetPaginationVariables() {
            this.startingElements = 1
            this.currentPage = 1
            this.offset = 0
        },

        /**
         * @description used to change the take variable for the tabulator
         */
        async onChangeTake() {
            if (this.currentPage > 1)
                this.resetPaginationVariables()

            await this.getUsers()
        },

        /**
         * @description used to go to the previous page
         */
        async previousPage() {
            if (this.currentPage > 1) {
                this.currentPage = this.currentPage - 1
                this.getUsers()
            }
        },

        /**
         * @description used to go to the next page
         */
        async nextPage() {
            if (this.handleNextPageDisabled()) return
            this.currentPage = this.currentPage + 1
            this.getUsers()
        },

        async getUsers() {
            this.isLoading = true
            this.hideTabulator = true

            this.take = this.pageSize
            this.offset = (this.currentPage - 1) * this.take
            console.log(this.take, this.offset);
            // await this.playersStore.getPaginatedUsers(this.take, this.offset)
            // ! update the pagination variables and set the tabulator data
            this.changePaginationVariables()

            // this.tabulator.setData(this.playersStore.playerList)

            this.isLoading = false
            this.hideTabulator = false
        },
        // async saveWallet() {
        //     let successMessage = '';
        //     let error = '';
        //     this.v$.$validate()
        //     if (this.v$.$error) {
        //         this.errorMessage = error
        //     } else {
        //         try {
        //             const walletRequest = new WalletRequest(this.wallet_name, +this.paid_credit, +this.free_credit, this.wallet_status, this.start_validity, this.end_validity)
        //             if (this.wallet.id) {
        //                 error = this.$t('message.walletPage.updateWalletError', { productName: this.wallet_name, error: '' })
        //                 successMessage = this.$t('message.walletPage.updateWalletSuccess', { productName: this.wallet_name })
        //                 await this.walletStore.updateWallet(this.wallet.id, walletRequest)
        //             } else {
        //                 error = this.$t('message.walletPage.createWalletError', { productName: this.wallet_name, error: '' })
        //                 successMessage = this.$t('message.walletPage.createWalletSuccess', { productName: this.wallet_name })
        //                 await this.walletStore.createWallet(walletRequest)
        //             }

        //             toast.success(successMessage, {
        //                 theme: 'colored',
        //                 position: toast.POSITION.TOP_RIGHT,
        //             });

        //             this.hideModal()
        //             this.$emit('closeModal')
        //         } catch (e: any) {
        //             this.errorMessage = error + e.message;
        //         }
        //     }


        // },
    }
})
</script>