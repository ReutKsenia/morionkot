<template>
    <v-container class="order">
        <h1 class="order_details">Детали заказа</h1>
        <v-row>
            <v-col
                cols="12"
                md="8">
                <v-form>
                    <h3 class="order_headers">Ваше имя</h3>
                    <v-text-field
                    v-model="details.customer_name"
                    label="Введите имя (необязательно)"
                    filled
                    color="deep-purple"
                    style="min-height: 5%"
                    ></v-text-field>
                    <h3 class="order_headers">Телефон</h3>
                    <v-text-field
                    v-model="details.phone_number"
                    :rules="rules.phone_number"
                    label="Введите номер телефона (обязательно)"
                    filled
                    color="deep-purple"
                    style="min-height: 5%"
                    ></v-text-field>
                    <h3 class="order_headers">Доставка</h3>
                    <v-select
                    v-model="details.way_of_reception"
                    :items="way_of_reception"
                    :rules="rules.required"
                    label="Выберете способ доставки"
                    filled
                    color="deep-purple"
                    style="min-height: 5%"
                    ></v-select>
                    <p class="order_headers">Дата доставки заказа</p>
                    <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    style="min-height: 5%"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="details.delivery_date"
                        filled
                        label="Выберете дату"
                        append-icon="event"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="details.delivery_date" @input="menu = false"></v-date-picker>
                    </v-menu>
                    <p class="order_headers">Адрес доставки (заполгяется при доставке курьером)</p>
                    <v-text-field
                    v-model="details.delivery_adress"
                    label="Улица, номер дома/корпус, номер квартиры"
                    filled
                    color="deep-purple"
                    style="min-height: 5%"
                    ></v-text-field>
                    <h3 class="order_headers">Оплата (при получении)</h3>
                    <v-select
                    v-model="details.payment_method"
                    :items="payment_method"
                    :rules="rules.required"
                    label="Выберете способ оплаты"
                    filled
                    color="deep-purple"
                    style="min-height: 5%"
                    ></v-select>
                </v-form>
            </v-col>
            <v-col>
            <v-data-table
            :items="CART"
            class="elevation-2"
            hide-default-footer>
            <template v-slot:body="{items}">
            <tbody>
                <tr>
                    <td>
                        <h3>Список товаров</h3>
                    </td>
                </tr>
                <tr v-for="(item,index) in items" :key="index">
                <td>{{ item.quantity }} х {{ item.name }} {{ item.selectedPrice }} BUN</td>
                </tr>
            </tbody>
            <v-divider/>
            </template>
                <template slot="footer">
                    <tfoot>
                        <tr>
                            <td>
                                <div>
                                    <h3>Сумма: {{SUM | toFix | formattedPrice}}</h3>
                                </div>
                            </td>
                            
                        </tr>
                    </tfoot>
                </template>
        </v-data-table>
        </v-col>
        </v-row>
        <v-btn style="margin: 2%; background-color: #524b98; color: white;"
        @click="addOrder">
            Оформить заказ
        </v-btn>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import toFix from "../../filters/toFix";
import formattedPrice from "../../filters/price-format";
import AddOrder from '../../services/orderService'

export default {
    name: 'order',
    props: {},
    data() {
        return {
            details: {
                customer_name: '',
                phone_number: '',
                way_of_reception: '',
                delivery_adress: '',
                delivery_date: '',
                cost: this.SUM,
                status: false,
                payment_method: '',
                //products_id: []
            },
            rules: {
                phone_number: [v => (v || '').match(/^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/) ||                 
                'Номер некорректный'],
                required: [v => !!v || 'Это поле является обязательным к заполнению'],
            },
            way_of_reception: ['Курьером', 'Самовывоз пр. Победителей, 106'],
            payment_method: ['Наличными', 'Картой'],
        }
    },
    computed: {
        ...mapGetters([
            'SUM',
            'CART'
        ]),
    },
    filters: {
      formattedPrice,
      toFix
    },
    methods: {
        addOrder () {
            this.details.cost = this.SUM;
            // this.details.products_id = [];
            // for(let i=0; i< this.CART.length; i++){
            //     this.details.products_id.push(this.CART[i]._id);
            // }
            AddOrder.add(this.details, this.CART);
      },
    }
}
</script>

<style lang="scss">
.order_details {
    margin: 4%;
}
.order_headers {
    text-align: start;
    margin: 1%;
}
</style>