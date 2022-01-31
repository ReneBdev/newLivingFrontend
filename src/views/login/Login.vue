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

		async onSubmit() {
			if (!this.email) {
                alert('Bitte geben Sie eine E-Mail ein.')
                return
            }
			if (!this.pw) {
                alert('Bitte geben Sie ein Passwort ein.')
                return
            }
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
			const data = await response.json()
			if (response.status !== 500) {
				window.location.href ="/"
			} else {
				alert("Login fehlgeschlagen.")
			}
		},
		async resetPassword() {
			if (!this.email) {
                alert('Bitte geben Sie eine E-Mail ein.')
                return
            }
			const response = await fetch('api/registrierung/passwort-vergessen?email={'+this.email+'}')
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