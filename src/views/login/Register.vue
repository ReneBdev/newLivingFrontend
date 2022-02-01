<template>
<h1> Registrierung </h1>
    <form @submit="onSubmit" >
         <br/> <br/>
        
        <input type="text" v-model="name" name="name" placeholder="Vor- und Nachname" />

        <input type="email" v-model="email" name="email" placeholder="E-Mail" />
        <input type="email" v-model="email_re" name="email_re" placeholder="E-Mail wiederholen" />

        <input type="password" v-model="password" name="password" placeholder="Password" />
        <input type="password" v-model="pw_re" name="pw_re" placeholder="Password wiederholen" /> 

        <input type="submit" value="Registrieren" class="button" />
    </form>

</template>

<script>
export default {
    name: 'UserReg',
    data() {
        return {
            name: '',
            email: '',
            email_re: '',
            password: '',
            pw_re: '',
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()
            if (!this.name) {
                alert('Bitte geben Sie einen Namen an.')
                return
            }
            if (!this.email) {
                alert('Bitte geben Sie eine E-Mail an.')
                return
            }
            if (this.email !== this.email_re) {
                alert('E-Mails stimmen nicht über ein.')
                return
            }
            if (!this.password) {
                alert('Bitte geben Sie ein Passwort an.')
                return
            }
            if (this.password !== this.pw_re) {
                alert('Passwörter stimmen nicht über ein.')
            }
            const newAccount = {
                email: this.email,
                name: this.name,
                passwort: this.password,
            }
            const response = await fetch('api/registrierung', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(newAccount)
            })
            const data = await response.json()
        }
    }
};
</script>

<style scoped>
form {
    max-width: 400px;
    margin: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}


input {
    width: 100%;
}

label {
    margin-bottom: 0px;
    margin-top: 10px;
}
</style>