<template>
<v-app id="app">
    <v-main-wrapper/>
</v-app>
</template>

<script>
import vMainWrapper from './components/main-wrapper';
//import vAdminWrapper from './components/admin-wrapper';
//import {mapActions, mapGetters} from 'vuex'
//import * as Auth from './components/authentication/index'

export default {
  name: 'App',

  components: {
    vMainWrapper,
  },
  // computed: {
  //       ...mapGetters([
  //           'ADMIN'
  //       ]),
  //   },
  //   methods: {
  //       ...mapActions([
  //           'GET_ADMIN',
  //       ]),
  //       setAdmin(){
  //         this.GET_ADMIN(Auth.default.admin);
  //       }
  //   },
  //   mounted () {
  //     this.setAdmin();
  //   },
  data: () => ({
    //
  }),
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
