<template>
    <h1>Umzugsplan Teilen</h1>
	<div v-show="!has_link">
        <p> Wenn du den Umzugsplan mit Freunden teilen möchtest, klicke hier:</p>
        <ul>
            <li class="button" @click="requestLink">Freigabelink erstellen</li>
        </ul>
	</div>
    <div v-show="has_link">
        <p> Link zum Umzugsplan: <span>{{this.account.link}}</span> </p>
        <div id="button_container">
            <div class="button" id="kopieren" @click="kopieren">Kopieren</div>
            <div class="button" @click="deactivate" style="background: darkred; border-color: darkred">Link deaktivieren</div>
        </div>
        
        <h1> </h1>
        <div class="email_field">
            <input type="email" v-model="new_mail" name="new_mail" placeholder="E-Mail" />
            <div class="button" @click="sendEmail"> Senden </div>
        </div>
    </div>
</template>

<script>

export default {
	name: 'Teilen',
    props: {
        account: Object,
    },
	data() {
        return {
            has_link: false,
            new_mail: ""
        }
	},
	methods: {
		async requestLink() {
            const response = await fetch('../api/link/neu')
			const data = await response.json()
            $emit('refresh')
        },
        async deactivate() {
            const response = await fetch('../api/link/deaktivieren')
			const data = await response.json()
            $emit('refresh')
        },
        async sendEmail() {
            const response = await fetch('../api/link/teilen?email='+this.new_mail)
			const data = await response.json()
        },
        kopieren() {
            navigator.clipboard.writeText(this.account.link);
            document.getElementById("kopieren").innerHTML = 'Kopiert!'
        },
	},
    async created() {
        if (this.account.link) {
            this.has_link = true
        }
    },
    emits: ['refresh']
}
</script>

<style scoped>
ul {
    text-align: center;
    list-style-type: none;
    max-width: 800px;
    min-width: 300px;
    margin: auto;
}
li {
    padding: 5px 20px;
    margin: 10px 20%;
}

#button_container > .button  {
    max-width: 800px;
    min-width: 300px;
    margin: 10px 10px;
}
#button_container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

p > span {
    color: lightskyblue;
    text-decoration: underline;
}

.email_field {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.email {
    margin: 5px;
}
.email:hover {
    color: red;
}

input {
    text-align: left;
    padding: 5px 5px;
}
</style>