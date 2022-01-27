<template>
	<div>
		<ol>
            <li> {{offer.angebot}} </li>
            <li> {{offer.kaution}}</li>
            <li> {{offer.preispkm}} </li>
            <li> {{offer.preisph}}</li>
            <li> 69,69€ </li>
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
			console.log(id)
			const buchung = {
                id: id
            }
            const response = await fetch('../api/dienstleistung/id/'+id+'/buchen', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(buchung)
            })
            const data = await response.json()
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

</style>
