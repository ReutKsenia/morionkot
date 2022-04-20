<template>
  <div class="courier-orders">
    <h1>Заказы</h1>
    <v-data-table :headers="headers" :items="ORDERS_UNEXECUTED_FOR_COURIER" class="elevation-1">
        <template v-slot:[`item.delivered`]="{ item }">
          <v-simple-checkbox v-model="item.delivered" @click="changeStatus(item)" :ripple="false"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-dialog v-model="dialog" scrollable :retain-focus="false">
            <template v-slot:activator="{ on }">
              <v-icon @click="getProducts(item.order_id)" v-on="on">visibility</v-icon>
            </template>
            <v-card>
              <v-data-table :headers="headersProducts" :items="expanded" class="elevation-1"></v-data-table>
              <v-card-actions>
                <v-btn color="yellow" @click="dialog = false">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.order_id.comment`]="{ item }">
          <v-dialog v-model="dialog2" scrollable :retain-focus="false">
            <template v-slot:activator="{ on }">
              <v-icon @click="getComment(item.order_id)" v-on="on">visibility</v-icon>
            </template>
            <v-card
            shaped>
              <v-card-title>Коментарии к заказу</v-card-title>
              <v-card-text>{{ comment}}</v-card-text>
              <v-card-actions>
                <v-btn color="yellow" @click="dialog2 = false">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.delete`]="{ item }">
          <v-dialog v-model="dialog3" scrollable :retain-focus="false">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">delete</v-icon>
            </template>
            <v-card
            
            shaped>
              <v-card-title>Вы уверены, что хотите удалить этот заказ?</v-card-title>
              <v-card-actions>
                <v-btn 
                style="margin: 2%;"
                color="yellow" @click="deleteItem(item)">Да</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
              <!-- <v-icon @click="deleteItem(item)">delete</v-icon> -->
        </template>
      </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import orderService from "../../services/orderService.js";

export default {
  name: "courier-settings",
  props: {},
  data() {
    return {
            expanded: [],
      dialog: false,
      dialog2: false,
      dialog3: false,
      comment: '',
      order: {},
      headers: [
        {
          text: "Доставлен",
          sortable: false,
          value: "delivered"
        },
        { text: "Имя заказчика", value: "order_id.customer_name", sortable: false },
        { text: "Номер", value: "order_id.phone_number", sortable: false },
        { text: "Адрес", value: "order_id.delivery_adress", sortable: false },
        { text: "Время", value: "order_id.time", sortable: false },
        { text: "Способ оплаты", value: "order_id.payment_method", sortable: false },
        { text: "Сумма", value: "order_id.cost", sortable: false },
        { text: "Коментарии", value: "order_id.comment", sortable: false },
        { text: "Детали", value: "actions", sortable: false },
        { text: "Удалить", value: "delete", sortable: false },
        
      ],
      headersProducts: [
        {
          text: "Товар",
          sortable: false,
          value: "product_id.name"
        },
        { text: "Количество", value: "quantity", sortable: false },
        { text: "Вес", value: "selectedPrice", sortable: false },
        { text: "Цена", value: "selectedWeight", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["ORDERS_UNEXECUTED_FOR_COURIER"]),
  },
  methods: {
    ...mapActions(["GET_ORDERS_UNEXECUTED_FOR_COURIER_FROM_DB"]),

    getProducts(order) {
      orderService.getProductsFromCart(order).then(products => {
        console.log(products);
        this.expanded = products.data.products;
      });
    },

    getComment(item){
      this.comment = item.comment;
    },
    
    changeStatus(item){
        orderService.changeStatusOrderCourier(item, this).then( () => {
          this.GET_ORDERS_UNEXECUTED_FOR_COURIER_FROM_DB(this);
      })
    },

    deleteItem(item) {
      orderService.deleteOrderForCourier(item, this).then(() => {
        this.dialog3 = false;
        this.GET_ORDERS_UNEXECUTED_FOR_COURIER_FROM_DB(this);
      })
    },
  },
  mounted() {
    this.GET_ORDERS_UNEXECUTED_FOR_COURIER_FROM_DB(this);
  },
};
</script>

<style lang="scss">
.courier-orders {
  margin: 15px;
}
</style>