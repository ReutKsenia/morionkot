<template>
    <div class="main-wrapper">
        <div v-if="!ADMIN && !MANAGER && !COURIER">
        <v-header/>
        <div class="main-wrapper-container">
            <!-- <keep-alive> -->
                <router-view></router-view>
            <!-- </keep-alive> -->
        </div>
        <v-footer/>
        </div>
        <div v-else-if="ADMIN">
            <admin-menu/>
        </div>
        <div v-else-if="MANAGER">
            <manager-menu/>
        </div>
        <div v-else-if="COURIER">
            <courier-menu/>
        </div>
    </div>
</template>

<script>
import vHeader from './layouts/v-header'
import vFooter from './layouts/v-footer'
import adminMenu from './layouts/admin-menu'
import managerMenu from './layouts/manager-menu'
import courierMenu from './layouts/courier-menu'
import {mapGetters} from 'vuex'

export default {
    name: 'main-wrapper',
     components: {
         vHeader,
         vFooter,
         adminMenu,
         managerMenu,
         courierMenu
     },
    props: {},
    data() {
        return {
            title: 'Main wrapper'
        }
    },
    computed: {
        ...mapGetters([
            'ADMIN', 'MANAGER', 'COURIER'
        ]),
    },
    methods: {},
    watch: {},
}
</script>

<style lang="scss">
.main-wrapper {
	display: flex;
	flex-direction: column;
	min-height: 100%;
}
.main-wrapper-container {
	flex: 1 0 auto;
}
</style>