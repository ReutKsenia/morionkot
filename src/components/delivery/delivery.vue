<template>
    <div class="delivery">
        <v-container>
            <h1 style="margin: 3%">Доставка и оплата</h1>
            <div class="delivery-content">
            <h2 class="delivery-content_headers">Мы принимаем заказы:</h2>
            <h4>Через сайт ежедневно с 8:00 до 23:00</h4>
            <p>Как заказать:</p>
            <ul class="delivery-content_lists">
                <li>Выберите необходимое Вам количество товаров и добавьте их в корзину;</li>
                <li>Выберите подходящие для Вас способ оплаты (наличными или банковской картой при получении) и доставки (самовывоз или курьером), предложенные нашей системой;</li>
                <li>Заполните и отправьте специальную форму, предложенную системой.</li>
            </ul>
            <p>В случае возникновения любых вопросов, вы можете связаться с нами по телефону:</p>
            <p>+375 (44) 567-10-56</p>
            <h2 class="delivery-content_headers">Доставка:</h2>
            <h4>Стоимость доставки в пределах г. Минска:</h4>
            <ul class="delivery-content_lists">
                <li>при заказе на сумму до 50 руб — 5 руб;</li>
                <li>при заказе на сумму свыше 50 руб — бесплатная.</li>
            </ul>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'delivery',
    props: {},
    data() {
        return {}
    },
    computed: {}
}
</script>

<style lang="scss">
.delivery-content {
    text-align: start;
    &_headers {
        margin-top: 2%;
        margin-bottom: 2%;
    }
    &_lists {
        margin-top: 1%;
        margin-bottom: 1%;
    }
}
</style>