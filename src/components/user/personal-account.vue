<template>
  <div>
    <div class="container-personal-account">
        <h1>Личный кабинет</h1>
        <div class="personal-account">
      <div class="current-orders">
        <router-link :to="{ name: 'currentOrders' }">
          <v-icon
            style="font-size: 100px;"
            color="white"
            x-large
            >book</v-icon
          >
          <h2>ТЕКУЩИЕ ЗАКАЗЫ</h2>
        </router-link>
      </div>
      <div class="personal-data">
        <router-link :to="{ name: 'personalData' }">
          <v-icon
            style="font-size: 100px; padding-left: 90px"
            color="white"
            x-large
            >persone</v-icon
          >
          <h2>ЛИЧНЫЕ ДАННЫЕ</h2>
        </router-link>
      </div>
      <div class="order-history">
        <router-link :to="{ name: 'orderHistory' }">
          <v-icon style="font-size: 100px" color="white" x-large>list</v-icon>
          <h2>ИСТОРИЯ ЗАКАЗОВ</h2>
        </router-link>
      </div>
        </div>
    </div>
    <div class="btn-exit">
    <v-btn style="background-color: #d1ab7f; color: white" @click.native="exit()">Выйти</v-btn>
    </div>
  </div>
</template>

<script>
import AuthenticationRegistration from "../../services/userService";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "personal-account",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["USER"]),
  },
  methods: {
    ...mapActions(["GET_USER"]),
    exit() {
      this.GET_USER(false);
      
      AuthenticationRegistration.exit(this, "/user-auth");
    },
  },
};
</script>

<style lang="scss">
.container-personal-account {
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  h1 {
      padding: 2%;
  }
}
.personal-data,
.order-history,
.current-orders {
  height: 50%;
  background: rgb(4 9 30 / 35%);
  margin-bottom: 5%;
  padding: 25px 15px;
  transition: 0.3s;
  a {
    text-decoration: none;
    color: #fff;
  }
  h2 {
    color: #fff;
  }
}
.personal-data:hover,
.order-history:hover,
.current-orders:hover {
  background: rgb(4 9 30 / 55%);
}
.btn-exit {
    margin-bottom: 5%;
}
@media screen and (min-width: 980px) {
    .personal-account { display: flex; justify-content: space-around; }
} 
</style>