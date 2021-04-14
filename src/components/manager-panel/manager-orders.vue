<template>
  <div class="manager-orders">
    
      <h1>Заказы</h1>
      <v-data-table :headers="headers" :items="ORDERS_UNEXECUTED_FOR_MANAGER" class="elevation-1">
        <template v-slot:[`item.is_formed`]="{ item }">
          <v-simple-checkbox v-model="item.is_formed" @click="changeStatus(item)" :ripple="false"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.sent_to_courier`]="{ item }">
          <v-simple-checkbox v-model="item.sent_to_courier" @click="changeStatus(item)" :ripple="false"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.canceled`]="{ item }">
          <v-simple-checkbox v-model="item.canceled" @click="changeStatus(item)" :ripple="false"></v-simple-checkbox>
        </template>
        <template v-slot:[`item.order_id.courier_id.name`]="{ item }">
          <v-select
          v-if="item.order_id.courier_id"
                  :value="item.order_id.courier_id.name"
                  :items="ALL_COURIERS"
                  item-text="name"
                  return-object
                  @change="changeCourier"
                  @click="getItem(item)"
                  color="orange"
                  ></v-select>
            <div v-else-if="item.order_id.way_of_reception != 'Курьером'"> </div>
            <v-select
            v-else
            :items="ALL_COURIERS"
                  item-text="name"
                  @change="changeCourier"
                  @click="getItem(item)"
                  return-object
                  color="orange"></v-select>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-dialog v-model="dialog" scrollable :retain-focus="false">
            <template v-slot:activator="{ on }">
              <v-icon small @click="getProducts(item.order_id)" v-on="on">visibility</v-icon>
            </template>
            <v-card>
              <v-data-table :headers="headersProducts" :items="expanded" class="elevation-1"></v-data-table>
              <v-card-actions>
                <v-btn color="orange darken-1" text @click="dialog = false">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.order_id.comment`]="{ item }">
          <v-dialog v-model="dialog2" scrollable :retain-focus="false">
            <template v-slot:activator="{ on }">
              <v-icon small @click="getComment(item.order_id)" v-on="on">visibility</v-icon>
            </template>
            <v-card
            shaped>
              <v-card-title>Коментарии к заказу</v-card-title>
              <v-card-text>{{ comment}}</v-card-text>
              <v-card-actions>
                <v-btn color="orange" @click="dialog2 = false">Закрыть</v-btn>
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
import employeeService from "../../services/employeeService.js"

export default {
  name: "manager-orders",
  props: {},
  data() {
    return {
      expanded: [],
      dialog: false,
      dialog2: false,
      comment: '',
      order: {},
      headers: [
        {
          text: "Сформирован",
          sortable: false,
          value: "is_formed"
        },
        {
          text: "Передан курьеру",
          sortable: false,
          value: "sent_to_courier"
        },
        {
          text: "Отменен",
          sortable: false,
          value: "canceled"
        },
        { text: "Имя заказчика", value: "order_id.customer_name", sortable: false },
        { text: "Номер", value: "order_id.phone_number", sortable: false },
        { text: "Адрес", value: "order_id.delivery_adress", sortable: false },
        {
          text: "Способ получения",
          value: "order_id.way_of_reception",
          sortable: false
        },
        { text: "Способ оплаты", value: "order_id.payment_method", sortable: false },
        { text: "Сумма", value: "order_id.cost", sortable: false },
        { text: "Коментарии", value: "order_id.comment", sortable: false },
        { text: "Курьер", value: "order_id.courier_id.name", sortable: false },
        { text: "Детали", value: "actions", sortable: false },
        
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
    ...mapGetters(["ORDERS_UNEXECUTED_FOR_MANAGER", "ALL_COURIERS"]),
    getCourier(item){
      if(item.order_id.courier_id) {return item.order_id.courier_id.name;}
      else return false;
    }
  },
  methods: {
    ...mapActions(["GET_ORDERS_UNEXECUTED_FOR_MANAGER_FROM_DB", "GET_ALL_COURIERS_FROM_DB"]),

    getProducts(order) {
      orderService.getProductsFromCart(order).then(products => {
        console.log(products);
        this.expanded = products.data.products;
      });
    },

    getComment(item){
      this.comment = item.comment;
    },
    
getItem(item){
      this.order = item.order_id;
    },
    
    changeCourier(item){
      employeeService.changeCourier(this.order, item, this);
    },

    changeStatus(item){
        console.log(item);
        orderService.changeStatusOrder(item, this).then( () => {
          this.GET_ORDERS_UNEXECUTED_FOR_MANAGER_FROM_DB(this);
      })
    }
  },
  mounted() {
    this.GET_ALL_COURIERS_FROM_DB(this);
    this.GET_ORDERS_UNEXECUTED_FOR_MANAGER_FROM_DB(this);
  }
};
</script>

<style lang="scss">
.manager-orders{
  margin: 15px;
}
</style>