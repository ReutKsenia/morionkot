<template>
<v-container>
    <div v-if="CART.length">
<v-data-table
    :headers="headers"
    :items="CART"
    class="elevation-2"
    hide-default-footer
  >
  <template v-slot:body="{items}">
  <tbody>
    <tr v-for="(item,index) in items" :key="index">
      <td>
        <img :src="require('../../assets/images/' + item.image[0])" style="height: 100px"/>
      </td>
      <td>{{ item.name }}
      </td>
      <td>{{ item.selectedWeight }} g</td>
      <td>{{ item.selectedPrice }} BUN</td>
      <td style="justify-content: center;">
          <div class="d-flex align-center mb-6" style="justify-content: center; margin-bottom: 0px !important;">
          <div class="d-flex align-center mb-6" style="justify-content: center; margin-bottom: 0px !important;">{{ item.quantity }}
          <div class="d-flex flex-column mb-6" style="justify-content: center; margin-bottom: 0px !important;">
          <v-btn icon
          @click="increment(index)">
              <v-icon>add</v-icon>
              </v-btn>
              <v-btn icon
              @click="decrement(index)">
              <v-icon>remove</v-icon>
              </v-btn>
          </div>
          
          </div>
          <div>
          <v-btn icon 
          class="d-flex align-center mb-6" 
          style="justify-content: center; margin-bottom: 0px !important;"
          @click="deleteFromCart(index)">
              <v-icon>delete</v-icon>
              </v-btn>
          </div>
          </div>
      </td>
    </tr>
   </tbody>
   <v-divider/>
    </template>
    <template slot="footer">
        <tfoot>
            <tr>
                <td>
                    <div>TOTAL: {{cartTotalCost | toFix | formattedPrice}}</div>
                </td>
                
            </tr>
        </tfoot>
    </template>
  </v-data-table>
  <v-btn style="margin: 2%; background-color: #524b98; color: white;"
  to="/order">
      Перейти к оформлению заказа
  </v-btn>
    </div>
  <div v-else>
      <h1>Корзина пуста!</h1>
  </div>
</v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
  import toFix from "../../filters/toFix";
  import formattedPrice from "../../filters/price-format";

export default {
    name: 'cart',
    components: {
    },
    props: {},
    data() {
        return {
            headers: [
      { text: 'Продукт',  value: 'image[0]', align: 'center' },
      { text: 'Название', value: 'name', align: 'center' },
      { text: 'Вес', value: 'selectedWeight', align: 'center' },
      { text: 'Цена', value: 'selectedPrice', align: 'center' },
      { text: 'Количество', value: 'quantity', align: 'center' },
    ]
        }
    },
    computed: {
        ...mapGetters([
            'CART'
        ]),
        cartTotalCost() {
        let result = []
        if (this.CART.length) {
          for (let item of this.CART) {
            result.push(item.selectedPrice * item.quantity)
          }
          result = result.reduce(function (sum, el) {
            return sum + el;
          })
          this.ADD_SUM(result);
          return result;
        } else {
          this.ADD_SUM(result);
          return 0
        }
        
      }
    },
    filters: {
      formattedPrice,
      toFix
    },
    methods: {
        ...mapActions([
            'DELETE_FROM_CART',
            'INCREMENT_CART_ITEM',
            'DECREMENT_CART_ITEM',
            'ADD_SUM'
        ]),
        total(items){
            let t;
            for(let i=0; i <= items.length; i++){
                t += items[i].selectedPrice*items[i].quantity;
            }
            return t;
        },
        deleteFromCart(index) {
        this.DELETE_FROM_CART(index)
        },
        increment(index) {
        this.INCREMENT_CART_ITEM(index)
      },
      decrement(index) {
        this.DECREMENT_CART_ITEM(index)
      },
        }
}
</script>

<style>

</style>