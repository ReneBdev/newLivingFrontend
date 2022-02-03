<template>
	<div>
		<div class="box">
			<p class="firmname" >{{offer.name}}</p>
			<p>{{offer.anschrift}}</p>
		</div>
		<ol>
            <li> {{offer.typ}} </li>
            <li> {{offer.kaution}}€</li>
            <li> {{offer.preisProKilometer}}€ </li>
            <li> {{offer.preisProStunde}}€</li>
            <li> {{offer.gesamtPreis}}€ </li>
            <li class="book" @click="book(offer.id)"> Buchen</li>
        </ol>
	</div>
    
</template>

<script>

export default {
	name: 'Offer',
	props: {
        offer: Object,
	},
	methods: {
		async book(id) {
            const response = await fetch('../api/dienstleistung/buchen?id='+id)
            const data = await response.json()
			if (data) {
				alert("Erfolgreich "+this.offer.typ+" von "+this.offer.name+" gebucht!")
			} else {
				alert("Etwas ist schiefgelaufen")
			}
		}

	},
}
</script>

<style scoped>

.book {
	text-align: center;
	background: rgb(255,169,69);
	padding: 1px 0px;
	border-radius: 5px;
	cursor: pointer;
}
ol {
	list-style-type: none;
	padding: 0;
	margin: 0px;
}

li {
	display: inline-block;
	text-align: left;
	width: 100px;
	margin: 10px 0px;
}

.box {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
}

.box > p {
	margin: 0px;
	margin-top:20px;
	padding: 0px;
	padding-right: 20px;
}

.firmname {
	font-weight: bold;
}

</style>
