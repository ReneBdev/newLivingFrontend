<template>
	<Header :mobile="isMobile()" :angemeldet="angemeldet" :accName="this.account.name"/>
	<router-view :account="this.account" @refresh="refresh"/> 
</template>

<script>
import Header from  '@/components/Header.vue'
export default {
	name: 'App',
	data() {
		return {
			angemeldet: false,
			account: {}
		}
	},
	components: {
		Header,
	},
	methods: {
		isMobile() {
			if (screen.width <= 760) {
				return true;
			} else {
				return false;
			}
		},
		async fetchProfile(){
			const response = await fetch('api/account')
			const data = await response.json()
			if (response.status === 200) {
				return data
			}
			return false
		},
	},
	async refresh() {
		this.account = await this.fetchProfile()
	},
	async created() {
		this.account = await this.fetchProfile()
		if (this.account) {
			this.angemeldet = true
		} else {
			this.angemeldet = false
		}
	},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; 
  color: #2c3e50;
  padding: 2% 5%;
}



input {
	border-radius: 3px;
	margin: 5px;
	text-align: center;
	padding: 5px 0px;
}

.button {
	font-weight: bold;
	background: rgb(255, 169, 69);
	border: 2px solid rgb(255, 169, 69);
	border-radius: 10px;
	color: white;
	padding: 3px 20px;
	font-size: 120%;
	cursor: pointer;
	text-decoration: none;
}

#checked {
	cursor: pointer;
}

h1 {
	border-bottom: 1px solid lightgray;
	padding-bottom: 5px;
}

</style>
