<template>
    <ul>
        <li>
            <div class="entry" :class="[entry.erledigt ? 'green' : 'red' ]" >
                {{entry.text}} 
            </div>
        </li>
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
            this.show = false;
            this.name = ""
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

.name {
    margin: 0px;
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

.entry {
    padding-left: 10px;
}

</style>