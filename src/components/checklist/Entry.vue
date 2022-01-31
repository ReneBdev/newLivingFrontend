<template>
    <ul>
        <li><input type="checkbox" id="checked" v-model="this.entry.checked" name="checked" @click="toggleCheckbox" /></li>
        <li>
            <div class="entry" @click="log(entry.text)">
                {{entry.text}} 
            </div>
        </li>
        <div id="date"> {{entry.date}} </div>

        <div id="edit" @click="this.show = !this.show;">
            <img src="@/assets/bearbeiten.png" width="20" height="20"/>
        </div>

        <div id="del" @click="del(entry.id)">
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
            const newEntry = {
                id: this.entry.id,
                text: this.name,
                datum: this.date
            }
            const response = await fetch('api/eintrag/id/'+newEntry.id+'/update' , {
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
                const response = await fetch('../api/eintrag/id/'+id+'/löschen', {
                    method: 'DELETE'
                })
		    }
	    },
        async toggleCheckbox() {
            const response = await fetch('../api/eintrag/id/'+this.entry.id+'/erledigt')
            const data = await response.json()
        }
	},
    //emits: ['delete', 'edit'],
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

</style>