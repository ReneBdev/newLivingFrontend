<template>
<div :id="[isMobile() ? 'mobile' : 'table']">
	<ol>
		<li>Angebot</li>
		<li>Kaution</li>
		<li>Preis/km</li>
		<li>Preis/h</li>
		<li>Ihr Preis*</li>
		<li class="book">Buchen</li>
		
	</ol>
	<div class="list" :key="offer.id" v-for="offer in sp.offers">
		<Offer :offer="offer" />
	</div>
</div>
</template>

<script>
import Offer from './Offer.vue'
export default {
	name: 'ServiceProvider',
    props: {
        sp: Object,
    },
	components: {
        Offer,
	},
	methods: {
		isMobile() {
			if (screen.width <= 760) {
				return true;
			} else {
				return false;
			}
		}
	},
}
</script>

<style scoped>
#table {
	display: flex;
	flex-direction: column;
	margin-left: calc(50% - 300px);
	flex-wrap: nowrap;
	min-width: 650px;
	max-width: 650px;
}

#mobile {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	min-width: 650px;
	max-width: 650px;
}

.book {
	text-align: center;
}

ol {
	list-style-type: none;
	padding: 0;
	margin: 20px 0px 5px 0px;
	font-weight: bold;
}


li {
	display: inline-block;
	text-align: left;
	margin: 0px;
	width: 100px;
}



</style>