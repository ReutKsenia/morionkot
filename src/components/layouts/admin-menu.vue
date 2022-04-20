<template>
  <div class="admin-menu">
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Admin</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="exit" to="auth">
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <div height="100vh">
      <v-card width="auto" class="flexcard" height="100vh" flat="true">
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group active-class="deep-purple--text text--accent-4">

              <v-list-item to="/admin-products">
                <v-list-item-icon>
                  <v-icon>collections</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Товары</v-list-item-title>
              </v-list-item>

              <v-list-item to="/product-category">
                <v-list-item-icon>
                  <v-icon>library_add_chek</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Категории товаров</v-list-item-title>
              </v-list-item>

              <v-list-item to="/admin-managers">
                <v-list-item-icon>
                  <v-icon>face</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Менеджеры</v-list-item-title>
              </v-list-item>

              <v-list-item to="/admin-couriers">
                <v-list-item-icon>
                  <v-icon>directions_bike</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Курьеры</v-list-item-title>
              </v-list-item>

              <v-list-item to="/admin-settings">
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
import Auth from "../../services/authService";

export default {
  name: "admin-menu",
  props: {},
  data() {
    return {
      drawer: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions(["GET_ADMIN"]),
    exit() {
      console.log("admin");
      this.GET_ADMIN(false);
      Auth.exit(this);
    },
  },
};
</script>

<style>
</style>