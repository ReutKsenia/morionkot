<template>
  <div class="current">
    <h1>Состояние заказа</h1>
    <v-stepper>
      <v-stepper-header>
          <v-stepper-step
          step="1"
        >
          Зказ обрабатывается
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
          step="2"
          :complete="CURRENT_ORDER.is_formed"
        >
          Сформирован
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step
          step="3"
          :complete="CURRENT_ORDER.sent_to_courier"
        >
          Передан курьеру
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step
          step="4"
        :complete="CURRENT_ORDER.delivered"
        >
          Доставлен
        </v-stepper-step>
  
        <v-divider></v-divider>
  
        <v-stepper-step 
        step="5"
        :complete="CURRENT_ORDER.received">
          Получен
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
    <div class="current-order-text">
    <p>Если Вы получили этот заказ, пожалуйста, подтвердите это.</p>
    <p>Для этого нажмите на кнопку "Подтвердить".</p>
    <p>Спасибо за покупку!</p>
    </div>
    <v-dialog v-model="dialog" max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn
            style="margin: 2%; color: white"
            color="deep-purple"
            v-on="on"
            :disabled="isAddButtonDisabled"
            >Подтвердить</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="headline" style="display: block"
            >Вы получили заказ?</v-card-title
          >
          <v-card-text>Если вы получили свой заказ, то нажмите на кнопку "Подтвердить". Вы можете оценить работу наших курьеров ниже. Спасибо за покупку!</v-card-text>
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey lighten-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            large
          ></v-rating>
          <v-divider></v-divider>
          <v-card-actions class="justify-space-between">
            <v-spacer></v-spacer>
            <v-btn 
            style="color: white"
            color="deep-purple darken-1" @click="received()"
              >Подтвердить</v-btn
            >
        <v-btn text @click="notNow">
          Не сейчас
        </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import orderService from '../../services/orderService.js'

export default {
  name: "current",
  props: {},
  data() {
    return {
        dialog: false,
        rating: Number,
    };
  },
  computed: {
      ...mapGetters(["CURRENT_ORDER"]),

      isAddButtonDisabled() {
      if (!this.CURRENT_ORDER.delivered) return true;
      else if (!this.CURRENT_ORDER.received) return true;
      else return false;
    },
  },
  methods: {
      ...mapActions(["GET_CURRENT_ORDER"]),

      received(){
          orderService.receivedOrder(this, this.CURRENT_ORDER).then(() => {
              this.dialog = false;
              this.CURRENT_ORDER.received = true;
          })
      },
       notNow(){
           this.dialog = false;
           this.rating = null;
       }
  },
  mounted() {
  },
};
</script>

<style lang="scss">
.current {
    margin: 2%;
    h1 {
        margin: 2%;
    }
}
.current-order-text {
    margin: 5%;
}
</style>