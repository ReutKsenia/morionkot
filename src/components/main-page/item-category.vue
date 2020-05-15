<template>
    <div class="item-category-area">
        <div class="text-category-area">
            <h1>Категории доступных товаров</h1>
        </div>
        <div class="row-item-category">
            <div class="cake-item">
                <div>
                    <img src="../../assets/images/cake2.jpg"/>
                </div>
                <router-link :to="{name: 'catalog'}">
                    <h3>Торты</h3>
                </router-link>
                <p>
                    kcamdcmadcmadcmao dcamdcmaaw
                    dscasdcasdcasdcasdc
                    Casdcadadedawf
                </p>
            </div>
            <div class="cake-item">
                <div>
                    <img src="../../assets/images/cheesecake.jpg"/>
                </div>
                <router-link :to="{name: 'catalog'}">
                    <h3>Чизкейки</h3>
                </router-link>
                <p>
                    kcamdcmadcmadcma odcamdcmaaw
                    dscasdcasdcasdcasdc
                    Casdcadadedawf
                </p>
            </div>
            <div class="cake-item">
                <div>
                    <img src="../../assets/images/cake2.jpg"/>
                </div>
                <router-link :to="{name: 'catalog'}">
                    <h3>Торты</h3>
                </router-link>
                <p>
                    kcamdcmadcmadcma odcamdcmaaw
                    dscasdcasdcasdcasdc
                    Casdcadadedawf
                </p>
            </div>
        </div>
        <router-link class="go-to-menu" :to="{name: 'catalog'}">Посмотреть всё меню</router-link>
    </div>
</template>

<script>
export default {
    
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
.row-item-category {
    display: flex;
    flex-wrap: wrap;
    padding-left: 165px;
    padding-right: 165px;
    justify-content: space-around;
}
.cake-item {
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 25%;
    max-width: 25%;
    text-align: center;
        box-sizing: border-box;
    img {
        border-radius: 90px;
        max-width: 100%;
        height: auto;
        vertical-align: middle;
        transition: 0.3s;
        border-style: none;
    }
    a {
        text-decoration: none;
        font-family: $font-family;
        color: $color-font;
        transition: 0.3s;
    }
}
.cake-item:hover {
    img {
        transform: scale(1.1);
    }
    a {
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
    margin-top: 80px;
    text-decoration: none;
    border: 1px solid transparent;
}
.go-to-menu:hover {
    background-color: transparent;
    border: 1px solid $color;
    color: $color;
}
</style>