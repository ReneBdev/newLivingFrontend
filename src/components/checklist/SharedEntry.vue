<template>
    <ul>
        <li>
            <div class="entry" :class="[entry.erledigt ? 'green' : 'red' ]" >
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
        code: String
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
        async add() {
            if(!this.name) {
                alert("Bitte einen Namen angeben!")
                return
            }
            const addName = {
                eintragId: this.entry.id,
                name: this.name
            }
            const response = await fetch('../../api/link/id/'+this.code+'/eintrag' , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(addName)
            })
            const data = await response.json()
            this.name_list.push(this.name)
            this.show = false;
            this.name = ""
        },
        removeName(name) {
            if (confirm("Sind Sie sich sicher, dass sie "+name+" von dem Eintrag entfernen wollen?")) {
                this.name_list.splice(this.name_list.indexOf(name), 1)
            }
        },
	},
}
</script>
<style scoped>

ul {
	list-style-type: none;
	padding: 3px;
    max-width: 600px;
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
    margin-right: 1px;
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

.green {
    border-left: 10px solid green;
}

.red {
    border-left: 10px solid red;
}

</style>