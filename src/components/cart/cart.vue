<template>
    <div class="cart">
        <cart-item/>
    </div>
</template>

<script>
import cartItem from './cart-item'

export default {
    name: 'cart',
    components: {
        cartItem
    },
    props: {},
    data() {
        return {}
    },
    computed: {}
}
</script>

<style>

</style>