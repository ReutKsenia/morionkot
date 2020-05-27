<template>
<div class="v-header">
<v-container class="v-header" style="padding-top: 6px; padding-bottom: 4px;">
	<v-toolbar 
	class="v-header-toolbar"
	flat="true"
	color="#d1ab7f"
	dense="true">
		<v-icon
		color="#2c3e50"
		size="large">phone</v-icon>
		<a class="tel" 
		href="tel:+375445671056"
		style="color:#2c3e50">+375 (44) 567-10-56</a>
    <v-spacer></v-spacer>
		<div class="info-container">
			<div class="work-hours">
				Время работы: Пн-Вс 12:00-22:30
				<br>
				Доставка выпечки в Минске
			</div>
		</div>
	</v-toolbar>
</v-container>
<div class="v-header-main-menu">
	<v-container>
		<v-toolbar 
		flat="true">
			<router-link :to="{name: 'mainPage'}">
				<v-img
				src="../../assets/morion_logo1.gif"
				max-height="80px"
				max-width="80px">
				</v-img>
			</router-link>
			<v-spacer></v-spacer>
			<v-tabs 
			right="true"
			color="#d1ab7f">
			<v-tab to="/">ГЛАВНАЯ</v-tab>
			<v-tab to="/catalog">МЕНЮ</v-tab>
			<v-tab to="/delivery">ДОСТАВКА</v-tab>
			<v-tab to="/about">О НАС</v-tab>
			<v-tab to="/comments">ОТЗЫВЫ</v-tab>
			<v-tab to="/cart">
				<v-badge
				color="#7876d8">
					<span slot="badge">{{CART.length}}</span>
						<v-icon>shopping_cart</v-icon>
				</v-badge>
			</v-tab>
			</v-tabs>
		</v-toolbar>
	</v-container>
</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
	name: 'header',
	components: {
	},
	computed: {
        ...mapGetters([
            'CART'
        ])
    },
}
</script>

<style lang="scss">
.v-header {
	background: $color;
	padding: 0px;
	a {
		text-decoration: none;
		color: $color-font;
		font-size: 14px;
	}
}
.v-header-main-menu {
	background: white;
}
.info-container {
	font-size: 13px;
	text-align: right;
	display: block; 
	color: $color-font;
}
.work-hour {
	text-align: left;
    float: right;
}
</style>