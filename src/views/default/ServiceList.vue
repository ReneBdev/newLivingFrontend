<template>
    <h1> Dienstleister </h1>
    <div class="sort" >
        <p @click="updateList('')" :class="this.sort===''? 'active':''" >
            Alles Anzeigen</p>
        <p @click="updateList('anhänger')" :class="this.sort==='anhänger'? 'active':''" >
            Nur Anhänger</p>
        <p @click="updateList('transporter')" :class="this.sort==='transporter'? 'active':''" >
            Nur Transporter</p>
        <p @click="updateList('kilometer')" :class="this.sort==='kilometer'? 'active':''" >
            Nach Preis/Kilometer</p>
        <p @click="updateList('stunde')" :class="this.sort==='stunde'? 'active':''" >
            Nach Preis/Stunde</p>
        <p @click="updateList('gesamt')" :class="this.sort==='gesamt'? 'active':''">
            Nach Preis/Gesamt</p>
    </div>
	
    <ServiceProvider :sort='this.sort' :servicelist='this.servicelist' />
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
            sort: '',
            servicelist: []
        }
    },
	components: {
        ServiceProvider
	},
	methods: {
		async fetchAll() {
            const response = await fetch('api/dienstleistung')
            const data = await response.json()
            return data
        },
        async fetchArt(art) {
            const response = await fetch('api/dienstleistung/art?art='+art)
            const data = await response.json()
            return data
        },
        async fetchSort(art) {
            const response = await fetch('api/dienstleistung/sortiert?art='+art)
            const data = await response.json()
            return data
        },
        async updateList(type) {
            this.sort = type
            if (!type) {
                console.log("Type"+type)
                this.servicelist = await this.fetchAll()
            } else if( type==='anhänger' || type==='transporter' ) {
                console.log("Type"+type)
                this.servicelist = await this.fetchArt(type)
            } else if( type==='kilometer' || type==='stunde' || type==='gesamt') {
                console.log("Type"+type)
                this.servicelist = await this.fetchSort(type)
            } else {
                this.servicelist = []
                alert("Etwas ist schiefgelaufen.")
            }
        }
	},
    async created() {
        this.servicelist = await this.fetchAll()
    }
}
</script>

<style scoped>
#footnote {
    font-size: 90%;
    font-style: italic;
    padding-left: 50px;
}

.sort {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.sort * {
    border: 2px solid lightgreen;
    border-radius: 5px;
    padding: 5px;
    margin: 5px 5px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
}

.active {
    color: lightgreen;
}

</style>