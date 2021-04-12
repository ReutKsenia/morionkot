<template>
    <div class="manager-menu">
            <v-app-bar color="orange" dark>
              <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
              <v-toolbar-title>Manager</v-toolbar-title>

              <v-spacer></v-spacer>
  
            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  icon
                  v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
  
              <v-list>
                <v-list-item
                  @click="exit"
                  to="auth">
                  <v-list-item-title>Выйти</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            </v-app-bar>
    <div height="100vh">
    <v-card
      width="auto"
      class="flexcard"
      height="100vh"
      flat="true">
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="orange--text text--accent-4">
          <v-list-item to="/manager-orders">
            <v-list-item-icon>
              <v-icon>format_list_bulleted</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Заказы</v-list-item-title>
          </v-list-item>

          <v-list-item  to="/manager-archive">
            <v-list-item-icon>
              <v-icon>book</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Архив</v-list-item-title>
          </v-list-item>

          <v-list-item  to="/manager-comments">
            <v-list-item-icon>
              <v-icon>collections</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Отзывы</v-list-item-title>
          </v-list-item>

          <v-list-item to="/manager-settings">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
    </v-card>
    </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import Auth from '../../services/authService'

export default {
    name: 'manager-menu',
    props: {},
    data() {
        return {
            drawer: false,
        }
    },
    computed: {
    },
    methods: {
      ...mapActions(["GET_MANAGER"]),
      exit(){
        console.log('manager')
        this.GET_MANAGER(false)
        Auth.exit(this);
      }
    }
}
</script>

<style>

</style>