<template>
    <ul>
        <li><input type="checkbox" id="checked" v-model="this.entry.checked" name="checked" @click="toggleCheckbox" /></li>
        <li>
            <div class="entry" @click="log(entry.text)">
                {{entry.text}} 
            </div>
        </li>
        <div id="name_box">
            <div :key="name" v-for="name in this.name_list">
                <p class="name" @click="removeName(name)">{{name}}, </p>
            </div>
        </div>
        
        
        <div id="date"> {{entry.date}} </div>

        <div id="add" @click="this.show = !this.show;">
            <img src="@/assets/hinzufügen.png" width="20" height="20"/>
        </div>

        <div v-show="show" class="show"> 
            <div class="box">
                <input type="text" v-model="name" name="name" placeholder="Namen eintragen" />
            </div>
            <div class="button" @click="add"> Hinzufügen</div>
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
            name_list: [],
        }
    },
	methods: {
		log(id) {
            navigator.clipboard.writeText(id);
        },
        async add() {
            if(!this.name) {
                alert("Bitte einen Namen angeben!")
                return
            }
            const newEntry = {
                id: this.entry.id,
                text: this.name
            }
            const response = await fetch('api' , {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newEntry)
            })
            const data = await response.json()
            this.name_list.push(this.name)
            this.show = false;
            this.name = ""
        },
        async del(id) {
            if ( confirm("Sind Sie sich sicher, dass sie den Eintrag löschen wollen?")) {
                const response = await fetch('../api/eintrag/id/'+id+'/löschen', {
                    method: 'DELETE'
                })
		    }
	    },
        removeName(name) {
            if (confirm("Sind Sie sich sicher, dass sie "+name+" von dem Eintrag entfernen wollen?")) {
                this.name_list.splice(this.name_list.indexOf(name), 1)
            }
        },
        async toggleCheckbox() {
            // Soll ein Eintrag toggeln oder einmal abgehakt und fertig? 
            const newEntry = {
                id: this.entry.id,
            }
            const response = await fetch('../api/eintrag/id/'+newEntry.id+'/erledigt' , {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newEntry)
            })
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
    padding-right: 5px;
    font-size: 80%;
    color: grey;
}
#add {
     position: absolute;
    right: 5px;
    top: 5px;
    margin-right: 100px;
}

#name_box {
    position: absolute;
    top: 5px;
    left: 20vw;

    display: flex;
    flex-direction: row;
}

.name {
    margin: 0px;
}

.name:hover {
    color: red;
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