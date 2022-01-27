<template>
	<Header :mobile="isMobile()" :angemeldet="angemeldet" />
	<router-view /> 
</template>

<script>
import Header from  '@/components/Header.vue'

//@login="loggedIn"
export default {
	name: 'App',
	data() {
		return {
			angemeldet: false,
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
		loggedIn(l) {
			console.log(l)
			this.angemeldet = l;
			//this.$router.push('/')
		}
	},
	created() {
		if (document.cookie) {
			console.log(document.cookie)
			const cookie = document.cookie
			.split('; ')
			.find( row => row.startsWith ('account='))
			.split('=')[1]
			if (cookie) {
				this.angemeldet = true;
			}
		} else {
			console.log("No cookies found!")
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
