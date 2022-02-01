<template>
    <ul >
        <li>
            <div class="entry" @click="toggleCheckbox" :class="[entry.erledigt ? 'green' : 'red' ]" >
                {{entry.text}}
            </div>
        </li>
        <div id="date"> {{entry.datum}} </div>

        <div id="edit" @click="this.show = !this.show;" v-if="!this.entry.vorgabe" >
            <img src="@/assets/bearbeiten.png" width="20" height="20"/>
        </div>

        <div id="del" @click="del(entry.id)" v-if="!this.entry.vorgabe" >
            <img src="@/assets/loeschen.png" width="20" height="20"/>
        </div>

        <div v-show="show" class="show"> 
            <div class="box">
                <input type="text" v-model="name" name="name" placeholder="Text ändern..." />
                <input type="text" v-model="date" name="date" placeholder="Datum ändern" />
            </div>
            <div class="button" @click="edit"> Ändern</div>
        </div>
    </ul>
</template>

<script>
export default {
	name: 'Entry',
	props: {
        entry: Object,
	},
    data() {
        return {
            show: false,
            name: "",
            date: "",
        }
    },
	methods: {
		log(id) {
            navigator.clipboard.writeText(id);
        },
        async edit() {
            if(!this.name) {
                alert("Bitte einen Text angeben!")
                return
            }
            var dateformat = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/
            if (!this.date.match(dateformat)) {
                alert("Bitte ein gültiges Datum eingeben: TT.MM.JJJJ!")
                return
            }
            const newEntry = {
                text: this.name,
                datum: this.date
            }
            const response = await fetch('api/eintrag/update?id='+this.entry.id , { 
                method: 'PUT',
                headers: { 
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newEntry)
            })
            const data = await response.json()

            this.show = false;
            this.name = ""
            this.date = ""
        },
        async del(id) {
            if ( confirm("Sind sie sicher, dass sie den Eintrag löschen wollen?")) {
                const response = await fetch('../api/eintrag/löschen?id='+id, {
                    method: 'DELETE'
                })
                $emit('delete')
		    }
	    },
        async toggleCheckbox() {
            this.entry.erledigt = !this.entry.erledigt 
            const response = await fetch('../api/eintrag/erledigt?id='+this.entry.id)
            const data = await response.json()
        }
	},
    async created() {
        console.log(this.entry)
    },
    emits: ['delete']
}
</script>


<style scoped>
ul {
	list-style-type: none;
	padding: 3px;
    max-width: 800px;
    text-align: left;
    margin: auto;
    border: 2px solid inherit;
    border-radius: 10px;
    position: relative;
}
ul:hover {
    background: rgb(236, 236, 236);
}

li {
	display: inline-block;
	margin: auto;
    position: relative;
}


#date {
    position: absolute;
    right: 5px;
    top: 5px;
    padding-right: 65px;
    font-size: 80%;
    color: grey;
}
#edit {
     position: absolute;
    right: 5px;
    top: 5px;
    margin-right: 35px;
}
#del {
    position: absolute;
    right: 5px;
    top: 5px;
    margin-right: 5px;
}

.show {
    display: flex;
    flex-direction: row;
    align-items: center;
}

input {
    text-align: left;
    padding-left: 5px;
}

.button {
    width: 100px;
    text-align: center;
}

.entry {
    padding-left: 10px;
}

.green {
    border-left: 10px solid green;
}

.red {
    border-left: 10px solid red;
}

</style>