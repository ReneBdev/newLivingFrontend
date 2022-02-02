<template>
    <div id="box" v-show="angemeldet">
        <div id="header" v-show="!mobile">
            <Logo/>
            <h3>
            <router-link id="account"  to="/account">{{this.accName}}</router-link>
            <a class="logout" href="/" @click="logout" >Abmelden</a>
            </h3>
        </div>
        <div id="mobile" v-show="mobile">
            <Logo/>
            <h3>
                <router-link id="account" style="font-size: 130%" to="/account">{{this.accName}} </router-link>
            </h3>
            <a class="logout" href="/" @click="logout" >Abmelden</a>
        </div>
    </div>
    <div id="box" v-show="!angemeldet">
        <div id="header" v-show="!mobile">
            <Logo/>
            <h3>
            <router-link id="account"  to="/login">Anmelden</router-link>
            </h3>
        </div>
        <div id="mobile" v-show="mobile">
            <Logo/>
            <h3>
                <router-link id="account"  to="/login">Anmelden</router-link>
            </h3>
        </div>
    </div>

    <div class="nav" v-show="angemeldet">
            <router-link to="/">Umzugsplan</router-link>
            <router-link to="/teilen">Teilen</router-link>
            <router-link to="/tipps">Tipps</router-link>
            <router-link to="/dienstleister">Dienstleister</router-link>
        </div>
</template>

<script>
import Logo from '@/components/other/Logo.vue'
export default {
    name: 'Header',
    props: {
        mobile: Boolean,
        angemeldet: Boolean,
        accName: String
    },
    components: {
        Logo,
    },
    methods: {
        async logout(e) {
            e.preventDefault()
            document.cookie = 'JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            const response = await fetch('../api/ausloggen')
            const data = await response.json()
            window.location.href ="/"
        }
    },
    created() {
    }
}
</script>


<style scoped>
#box {
    display: flex;
    flex-direction: column;
}
#header {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0px 10%;
    font-size: 150%;
}

#header > h3 {
    position: absolute;
    top: 1;
    right: 0;
}
#account {
    border: none;
}
.logout {
    border: 1px solid lightgreen;
    background: lightgreen;
    color: white;
}
#mobile {
    align-items: center;
    padding: 5px;
    text-align: center;
}

.nav {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}


a {
    border: 2px solid lightgreen;
    border-radius: 5px;
    padding: 5px;
    margin: 5px 5px;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
}

a.router-link-exact-active {
  color: lightgreen;
}
</style>
