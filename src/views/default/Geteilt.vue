<template>
    <h1> Umzugsplan von {{this.name}} </h1>
	<div id="checklist">
		<EntryList :entrylist="entrys" type="shared" :code="this.code" />
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
            code: ""
        }
    },
	components: {
        EntryList,
	},
	methods: {
		async fetchEntrys() {
            const response = await fetch('../api/link/id/'+this.code)
            if ( response.status !== 200) {
                alert("Falscher Code!")
                this.$router.push('/')
            }
            const data = await response.json()
            return data
        },
	},
    async created() {
        this.code = this.$route.params.code
        const data = await this.fetchEntrys()
        this.name = data.name
        this.entrys = data.eintragList
    }
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