<template>
    <h1> Dienstleister </h1>
	<div  :key="service.id" v-for="service in services">
		<ServiceProvider :sp="service" />
	</div>
    <div id="footnote">
        *Unverbindliche Preiseinschätzung!
        <p> Wir berechnen Anhand Ihrer angegebenen Adressen ungefähr die Dauer und die zu fahrenden Kilometer wie folgt: </p>
        <p> Vom nächsten Standpunkt des Unternehmens aus zu Ihrem alten Wohnsitz, von dort aus zum neuen Wohnsitz und letztlich wieder zum Unternehmen zurück!</p>
        
    </div>
</template>

<script>
import ServiceProvider from '@/components/dienstleister/ServiceProvider.vue'
export default {
	name: 'ServiceList',
    data() {
        return {
            services: Array,
        }
    },
	components: {
        ServiceProvider
	},
	methods: {
		async fetchEntrys() {
            const response = await fetch('api/dienstleistung')
            const data = await response.json()
            return data
        }
	},
    async created() {
        this.services = await this.fetchEntrys()
    }
}
</script>

<style scoped>
#footnote {
    font-size: 90%;
    font-style: italic;
    padding-left: 50px;
}

</style>