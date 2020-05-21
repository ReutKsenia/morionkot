<template>
    <div class="main-wrapper">
        <div v-if="!ADMIN">
        <v-header/>
        <div class="main-wrapper-container">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <v-footer/>
        </div>
        <div v-else>
            <admin-menu/>
        </div>
    </div>
</template>

<script>
import vHeader from './layouts/v-header'
import vFooter from './layouts/v-footer'
import adminMenu from './layouts/admin-menu'
import {mapGetters} from 'vuex'

export default {
    name: 'main-wrapper',
     components: {
         vHeader,
         vFooter,
         adminMenu
     },
    props: {},
    data() {
        return {
            title: 'Main wrapper'
        }
    },
    computed: {
        ...mapGetters([
            'ADMIN'
        ]),
    },
    methods: {},
    watch: {},
}
</script>

<style lang="scss">
</style>