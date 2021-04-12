<template>
    <v-container class="item-category-area">
    <h1>Категории доступных товаров</h1>
        <div class="row-item-category">
        <div class="cake-item">
            <v-avatar
            width="200px"
            height="200px">
                <img src="../../assets/images/cake2.jpg"/>
            </v-avatar>
            <div>
                <router-link :to="{name: 'catalog'}">
                    <h3>Торты</h3>
                </router-link>
            </div>
            <div> 
                <p>
                    Великолепные торты на заказ в Минске от компании MorionKot
                </p>
            </div>
        </div>
        <div class="cake-item">
            <v-avatar
            width="200px"
            height="200px">
                <img src="../../assets/images/cheesecake.jpg"/>
            </v-avatar>
            <div>
                <router-link :to="{name: 'catalog'}">
                    <h3>Чизкейки</h3>
                </router-link>
            </div>
            <div>
                <p>
                    Лучшие чизкейки на заказ в Минске от компании MorionKot
                </p>
            </div>
        </div>
        <div class="cake-item">
            <v-avatar
            width="200px"
            height="200px">
                <img src="../../assets/images/пирожное.jpg"/>
            </v-avatar>
            <div>
                <router-link :to="{name: 'catalog'}">
                    <h3>Капкейки</h3>
                </router-link>
            </div>
            <div>
                <p>
                    Прекрасные капкейки на заказ в Минске от компании MorionKot
                </p>
            </div>
        </div>
        </div>
    <router-link tag="div" class="go-to-menu" :to="{name: 'catalog'}">Посмотреть всё меню</router-link>
    </v-container>
</template>

<script>
export default {
    name: 'item-category',
    props: {},
    data() {
        return {}
    },
    computed: {}
}
</script>

<style lang="scss">
.item-category-area {
    padding: 120px 15px;
    width: 100%;
}
.text-category-area {
    justify-content: center;
    padding-bottom: 80px;
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    h1 {
        font-size: 36px;
        padding-bottom: 10px;
    }
}
@media screen and (min-width: 1024px) {
    .row-item-category { display: flex; }
} 
.cake-item {
    position: relative;
    margin: 4%;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 25%;
    text-align: center;
        box-sizing: border-box;
    img {
        transition: 0.3s;
    }
    a {
        text-decoration: none;
        font-family: $font-family;
        color: #2c3e50;
        transition: 0.3s;
    }
    h3 {
        color: $color-font;
    }
}
.cake-item:hover {
    img {
        transform: scale(1.1);
    }
    h3 {
        color: $color;
    }
}
.go-to-menu {
    background: $color;
    line-height: 42px;
    padding-left: 30px;
    padding-right: 30px;
    color: #fff;
    display: inline-block;
    font-weight: 500;
    transition: 0.3s;
    cursor: pointer;
    position: relative;
    text-decoration: none;
    border: 1px solid transparent;
}
.go-to-menu:hover {
    background-color: transparent;
    border: 1px solid $color;
    color: $color;
}
</style>