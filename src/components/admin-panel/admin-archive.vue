<template>
  <div class="admin-orders">
    <v-container>
      <h1>Архив</h1>
      <v-data-table :headers="headers" :items="ORDERS_EXECUTED" class="elevation-1">
        <template v-slot:[`item.status`]="{ item }">
          <v-simple-checkbox v-model="item.status" @click="changeStatus(item)"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.details`]="{ item }">
          <v-dialog v-model="dialog" scrollable :retain-focus="false">
            <template v-slot:activator="{ on }">
              <v-icon small @click="getProducts(item)" v-on="on">edit</v-icon>
            </template>
            <v-card>
              <v-data-table :headers="headersProducts" :items="expanded" class="elevation-1"></v-data-table>
              <v-card-actions>
                <v-btn color="deep-purple darken-1" text @click="dialog = false">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
              <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import orderService from "../../services/orderService";

export default {
  name: "admin-archive",
  props: {},
  data() {
    return {
      expanded: [],
      dialog: false,
      headers: [
        {
          text: "Статус",
          sortable: false,
          value: "status"
        },
        { text: "Имя заказчика", value: "customer_name", sortable: false },
        { text: "Номер", value: "phone_number", sortable: false },
        { text: "Адрес", value: "delivery_adress", sortable: false },
        {
          text: "Способ получения",
          value: "way_of_reception",
          sortable: false
        },
        { text: "Способ оплаты", value: "payment_method", sortable: false },
        { text: "Сумма", value: "cost", sortable: false },
        { text: "Детали", value: "details", sortable: false },
        { text: "Удалить", value: "delete", sortable: false }
      ],
      headersProducts: [
        {
          text: "Товар",
          sortable: false,
          value: "product_id.name"
        },
        { text: "Количество", value: "quantity", sortable: false },
        { text: "Вес", value: "selectedPrice", sortable: false },
        { text: "Цена", value: "selectedWeight", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["ORDERS_EXECUTED"])
  },
  methods: {
    ...mapActions(["GET_ORDERS_EXECUTED_FROM_DB"]),

    deleteItem(item) {
      orderService.deleteOrder(item, this).then(() => {
        this.GET_ORDERS_EXECUTED_FROM_DB(this);
      })
    },

    getProducts(item) {
      orderService.getProductsFromCart(item).then(products => {
        console.log(products);
        this.expanded = products.data.products;
      });
    },
    
    changeStatus(item){
        orderService.changeStatusOrder(item, this).then(() => {
          this.GET_ORDERS_EXECUTED_FROM_DB(this);
        })
    }
  },
  mounted() {
    this.GET_ORDERS_EXECUTED_FROM_DB(this);
  }
};
</script>

<style>
</style>