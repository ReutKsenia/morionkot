<template>
  <div class="order-history-user">
    <h1>История заказов</h1>
    <v-data-table
      :headers="headers"
      :items="ORDERS_EXECUTED_FOR_USER"
      class="elevation-1"
    >
      <template v-slot:[`item.status`]="{ item }">
        <div v-if="item.received">Получен</div>
        <div v-else-if="item.canceled">Отменен</div>
      </template>
      <template v-slot:[`item.order_id.courier_id.name`]="{ item }">
        <div v-if="item.order_id.courier_id">
          {{ item.order_id.courier_id.name }}
        </div>
        <div v-else-if="item.order_id.way_of_reception != 'Курьером'"></div>
        <div v-else></div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-dialog v-model="dialog" scrollable :retain-focus="false">
          <template v-slot:activator="{ on }">
            <v-icon small @click="getProducts(item.order_id)" v-on="on"
              >visibility</v-icon
            >
          </template>
          <v-card>
            <v-data-table
              :headers="headersProducts"
              :items="expanded"
              class="elevation-1"
            ></v-data-table>
            <v-card-actions>
              <v-btn color="deep-purple darken-1" text @click="dialog = false"
                >Закрыть</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import orderService from "../../services/orderService.js";
//import router from "../../router/index.js";

export default {
  name: "order-history",
  props: {},
  data() {
    return {
      expanded: [],
      dialog: false,
      dialog2: false,
      comment: "",
      order: {},
      headers: [
        { text: "Статус", value: "status", sortable: false },
        {
          text: "Имя заказчика",
          value: "order_id.customer_name",
          sortable: false,
        },
        { text: "Номер", value: "order_id.phone_number", sortable: false },
        { text: "Адрес", value: "order_id.delivery_adress", sortable: false },
        {
          text: "Способ получения",
          value: "order_id.way_of_reception",
          sortable: false,
        },
        {
          text: "Способ оплаты",
          value: "order_id.payment_method",
          sortable: false,
        },
        { text: "Сумма", value: "order_id.cost", sortable: false },
        { text: "Курьер", value: "order_id.courier_id.name", sortable: false },
        { text: "Детали", value: "actions", sortable: false },
      ],
      headersProducts: [
        {
          text: "Товар",
          sortable: false,
          value: "product_id.name",
        },
        { text: "Количество", value: "quantity", sortable: false },
        { text: "Вес", value: "selectedPrice", sortable: false },
        { text: "Цена", value: "selectedWeight", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["ORDERS_EXECUTED_FOR_USER"]),
  },
  methods: {
    ...mapActions([
      "GET_ORDERS_EXECUTED_FOR_USER_FROM_DB"
    ]),

    getProducts(order) {
      orderService.getProductsFromCart(order).then((products) => {
        console.log(products);
        this.expanded = products.data.products;
      });
    },
  },
  mounted() {
    this.GET_ORDERS_EXECUTED_FOR_USER_FROM_DB(this);
  },
};
</script>

<style lang="scss">
.order-history-user {
  margin: 4%;
  margin-bottom: 6%;
  h1 {
    margin: 5%;
  }
}
</style>