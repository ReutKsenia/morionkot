<template>
    <div class="banner-area">
        <div class="banner-area-content">
            <div class="ban-cont">
                <div class="banner-content">
                    <h6>Whenever we bake, bake with our heart</h6>
                    <h1>Love with baking items</h1>
                    <router-link 
                    :to="{name: 'catalog'}"
                    style="color:white">
                        Перейти к меню
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.banner-area {
    background: url('../../assets/images/cake.jpg') center;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    width: 100%;
}
.banner-area-content {
    background-color: rgba(30, 16, 4, 0.37);
    height: 658px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
}
.ban-cont {
    width: 100%;
    height: 100%;
    margin-left: 200px;
    margin-right: 200px;
    align-items: center;
    display: flex;
}
.banner-content {
    text-align: center;
    justify-content: center;

    width: 100%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
    h6 {
        color: #fff;
        letter-spacing: 2px;
        font-weight: 400;
        font-size: 14px;
        text-transform: uppercase;
    }
    h1 {
        color: #fff;
        font-size: 72px;
        font-weight: 700;
        margin-top: 20px;
        padding: 2px 0px;
        margin-bottom: 20px;
        border-bottom: 1px solid $color;
        border-top: 1px solid $color;
    }
    a {
        background: $color;
        margin-top: 10px;
        line-height: 42px;
        padding-left: 30px;
        padding-right: 30px;
        border: none;
        color: #fff;
        display: inline-block;
        font-weight: 500;
        cursor: pointer;
        position: relative;
        text-transform: uppercase;
        text-decoration: none;
        border-radius: 0px !important;
        border: 1px solid transparent;
        transition: 0.3s;
    }
    a:hover {
        background-color: transparent;
        border: 1px solid #fff;
        color: white;
    }
}
</style>