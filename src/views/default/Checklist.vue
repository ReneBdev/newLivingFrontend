<template>
    <h1> Checkliste </h1>
	<div id="checklist">
		<EntryList :entrylist="entrys" type="entry"/>
        
	</div>
    <div class="box" >
        <div class="button" id="send" @click="show=!show" >Eintrag hinzufügen</div>
    </div>
    
    <div v-show="show" class="box" > 
        <input type="text" v-model="new_entry" name="new_entry" placeholder="Stichpunkt" />
        <input type="text" v-model="date" name="date" placeholder="Datum (optional)" />
        <div class="button" @click="addEntry" > Absenden</div>
    </div>
</template>

<script>
import EntryList from '@/components/checklist/EntryList.vue'
export default {
	name: 'Home',
    props: {
        account: Object,
    },
    data() {
        return {
            entrys: [],
            show: false,
            new_entry: "",
            date: "",
        }
    },
	components: {
        EntryList,
	},
	methods: {
		async fetchEntrys() {
            const response = await fetch('api/eintrag')
            const data = await response.json()
            return data
        },
        async addEntry() {
            if (!this.new_entry) {
                alert("Bitte einen Stichpunkt angeben!")
            }
            const newEntry = {
                text: this.new_entry,
                datum: this.date,
            }
            const response = await fetch('../api/eintrag/neu', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newEntry)
            })
            const data = await response.json()
        }
	},
    async created() {
        this.entrys = await this.fetchEntrys()
    },
    
}
</script>

<style scoped>
#checklist {
    margin-top: 20px;
}

#send {
    margin: 10px 0px;
    max-width: 300px;
}

ul {

    text-align: center;
    list-style-type: none;
    max-width: 800px;
    margin: auto;
}
li {
    padding: 5px 20px;
    margin: 10px 20%;
}

.box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>