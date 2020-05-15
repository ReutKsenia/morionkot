<template>
    <div class="main-wrapper">
        <v-header v-if="!ADMIN"/>
        <div class="main-wrapper-container">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <v-footer v-if="!ADMIN"/>
    </div>
</template>

<script>
import vHeader from './layouts/v-header'
import vFooter from './layouts/v-footer'
import {mapGetters} from 'vuex'

export default {
    name: 'main-wrapper',
     components: {
         vHeader,
         vFooter
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
    mounted() {
        console.log('Hello i am alive!')
    }
}
</script>

<style lang="scss">
    // .main-wrapper {
    //     margin: 0 auto;
    // }
    // .main-wrapper-container {
    //     margin-top: 100px;
    // }
</style>