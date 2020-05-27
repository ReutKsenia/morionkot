<template>
    <div class="v-footer">
            <v-container>
                <v-layout row wrap>
                    <v-flex>
                        <h4 style="color: white; margin: 2%">НАВИГАЦИЯ</h4>
                        <v-flex>
                        <v-btn
                        outlined
                        dark
                        width="90%"
                        style="margin: 1%"
                        to="/catalog">Mеню</v-btn>
                        </v-flex>
                        <v-flex>
                        <v-btn
                        outlined
                        dark
                        width="90%"
                        style="margin: 1%"
                        to="/delivery">Доставка</v-btn>
                        </v-flex>
                        <v-flex>
                        <v-btn
                        outlined
                        dark
                        width="90%"
                        style="margin: 1%"
                        to="/about">Онас</v-btn>
                        </v-flex>
                        <v-flex>
                        <v-btn
                        outlined
                        dark
                        width="90%"
                        style="margin: 1%"
                        to="/comments">Отзывы</v-btn>
                        </v-flex>
                    </v-flex>
                    <v-flex>
                        <h4 style="color: white; margin: 2%">КОНТАКТЫ</h4>
                        <v-flex style="color: white">Вы можете связаться с нами по номеру:</v-flex>
                        <v-flex style="color: white">+375 (44) 567-10-56</v-flex>
                        <v-flex style="color: white">Или напишите нам на почту:</v-flex>
                        <v-flex style="color: white">morionkot@gmail.com</v-flex>
                    </v-flex>
                    <v-flex>
                        <h4 style="color: white; margin: 2%">МЫ В СОЦ. СЕТЯХ</h4>
                        <v-btn icon style="color: white;" x-large>
                            <v-icon >fa-instagram</v-icon>
                        </v-btn>
                        <v-btn icon style="color: white;" x-large>
                            <v-icon >fa-vk</v-icon>
                        </v-btn>
                        <v-btn icon style="color: white;" x-large>
                            <v-icon >fa-telegram</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
    </div>
</template>

<script>
export default {
    name: 'v-footer',
    props: {},
    data() {
        return {}
    },
    computed: {}
}
</script>

<style lang="scss">
.v-footer {
    background: #04091e;
}
</style>