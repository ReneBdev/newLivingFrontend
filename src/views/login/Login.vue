<template>
<h1>Login</h1>
	<div class="login">
        <form @submit.prevent> 
			<div class="loginInput">
				<input type="email" v-model="email" name="email" placeholder="E-Mail" />
				<input type="password" v-model="pw" name="pw" placeholder="Password" />
			</div>
			<input type="submit" @click="onSubmit" value="Login" class="button" />
		</form>
		<div class="button" @click="resetPassword">Passwort vergessen</div>
		<router-link class="button" to="/registrierung">Registrieren</router-link>
	</div>
	
</template>

<script>
import Logo from '@/components/other/Logo.vue'
/* submit.prevent */
export default {
	name: 'Login',
	components: {
		Logo,
	},
	data() {
		return {
			email: "",
			pw: ""
		}
	},
	methods: {
		async fetchProfile(){
			const response = await fetch('api/login')
			const data = await response.json()
			return data
		},
		async onSubmit() {
			if (!this.email) {
                alert('Bitte geben Sie eine E-Mail ein.')
                return
            }
			if (!this.pw) {
                alert('Bitte geben Sie ein Passwort ein.')
                return
            }

			//document.cookie = "account="+this.email+"; SameSite=None;"


			const loginData = {
				email: this.email,
				passwort: this.pw,
			}
			const response = await fetch('api/login', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(loginData)
			})
			if (response.status !== 500) {
				console.log("NOT 500 ERROR STATUS")
				//return
			}
			const data = await response.json()
			//const profile = await this.fetchProfile()
			console.log(document.cookie)
			console.log(data)
			//window.location.href ="/"
			
		},
		async resetPassword() {
			if (!this.email) {
                alert('Bitte geben Sie eine E-Mail ein.')
                return
            }
			const response = await fetch('../api/registrierung/passwort-vergessen?email={'+this.email+'}')
			const data = response.json()
		}
	},
	created() {
	}
}
</script>

<style scoped>
.login {
	max-width: 400px;
	margin: auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.loginInput * {
	width: 100%;
	border: 2px solid black;
}

.button {
	margin: 5px;
}

#logo {
	max-width: 300px;
	cursor: pointer;
}


</style>