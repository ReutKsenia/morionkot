<template>
  <div class="admin-orders">
    <v-container>
      <h1>Заказы</h1>
      <v-data-table :headers="headers" :items="ORDERS" class="elevation-1">
        <template v-slot:item.status="{ item }">
          <v-simple-checkbox v-model="item.status" @change="changeStatus"></v-simple-checkbox>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-dialog v-model="dialog" scrollable>
            <template v-slot:activator="{ on }">
              <v-icon small @click="deleteItem(item)">delete</v-icon>
              <v-icon small @click="getProducts(item)" v-on="on">edit</v-icon>
            </template>
            <v-card>
              <v-data-table :headers="headersProducts" :items="expanded" class="elevation-1"></v-data-table>
              <v-card-actions>
                <v-btn color="deep-purple darken-1" text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import orderService from "../../services/orderService";

export default {
  name: "admin-orders",
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
        { text: "Actions", value: "actions", sortable: false }
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
    ...mapGetters(["ORDERS"])
  },
  methods: {
    ...mapActions(["GET_ORDERS_FROM_DB"]),

    deleteItem(item) {
      orderService.deleteOrder(item);
    },

    getProducts(item) {
      console.log("asd");
      orderService.getProductsFromCart(item).then(products => {
        console.log(products);
        this.expanded = products.data.products;
      });
    },
    
    changeStatus(item){
        console.log(item);
    }
  },
  mounted() {
    this.GET_ORDERS_FROM_DB();
  }
};
</script>

<style>
</style>