<template>
    <h1> Checkliste von {{this.name}} </h1>
	<div id="checklist">
		<EntryList :entrylist="entrys" type="shared" />
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
            name: "ERRROR",
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
        this.name = this.$route.query.name;
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