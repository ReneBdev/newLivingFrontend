<template>
    <h1>Accounteinstellungen</h1>
	<div>
		<div class="show"> 
            <div class="box">
                <input type="password" v-model="pw_old" name="pw_old" placeholder="Altes Passwort" />
                <input type="password" v-model="pw_new" name="pw_new" placeholder="Neues Passwort" />
			</div>
            <div class="box">
                <div class="button" @click="updatePassword"> Ändern</div>
            </div>
			<h1></h1>
			<div class="box">
                <input type="text" v-model="name" name="name" placeholder="Name" />
			</div>
            <div class="box">
                <input type="text" v-model="email" name="email" placeholder="E-Mail" />
            </div>
            <div class="box">
                <input type="text" v-model="iban" name="iban" placeholder="IBAN" />
            </div>
			<div class="box">
                Alte Adresse
            </div>
			<div class="box">
                <input type="text" v-model="plz_old" name="plz_old" placeholder="PLZ" />
                <input type="text" v-model="street_old" name="street_old" placeholder="Straße" />
			</div>
			<div class="box">
				Neue Adresse
            </div>
			<div class="box">
                <input type="text" v-model="plz_new" name="plz_new" placeholder="PLZ" />
                <input type="text" v-model="street_new" name="street_new" placeholder="Straße" />
			</div>
			<div class="box">
                <div class="button" @click="updateAccount">Ändern</div>
			</div>
        </div>
	</div>
</template>

<script>

export default {
	name: 'Account',
	data() {
        return {
            pw_old: '',
            pw_new: '',

            name: '',
            email: '',
			iban: '',

            plz_old: '',
            plz_new: '',
			street_old: '',
			street_new: '',
        }
    },
	components: {

	},
	methods: {
		async updatePassword() {
			if(!this.pw_old || !this.pw_new) {
                alert("Bitte Passwörter angeben!")
                return
            }
            const body = {
                altPasswort: this.pw_old,
                neuPasswort: this.pw_new
            }
            const response = await fetch('api/account/update-passwort' , { 
                method: 'PUT',
                headers: { 
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()

            this.pw_old = ""
            this.pw_new = ""
		},
		async updateAccount() {

            const body = {
				name: this.name,
				email: this.email,
				altPLZ: this.plz_old,
				altAdresse: this.street_old,
				neuPLZ: this.plz_new,
				neuAdresse: this.street_new,
				iban: this.iban
            }
            const response = await fetch('api/account/update-daten' , { 
                method: 'PUT',
                headers: { 
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()

            this.name = ''
            this.email= ''
			this.iban = ''

            this.plz_old = ''
            this.plz_new = ''
			this.street_old = ''
			this.street_new = ''
		}
	},
}
</script>

<style scoped>
.show {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.box {
    display: flex;
    flex-direction: row;
	justify-content: center;
    align-items: center;
}

input {
    text-align: left;
    padding-left: 5px;
}

.button {
	padding: 5px 30px;
    text-align: center;
	justify-content: center;
}
</style>
