<template>
    <h1>Accounteinstellungen</h1>
	<div>
		<div class="show"> 
            <div class="box">
                <input type="text" v-model="date" name="date" placeholder="Datum ändern" />
            	<div class="button" @click="edit"> Ändern</div>
			</div>
        </div>
	</div>
</template>

<script>

export default {
	name: 'Account',
	components: {

	},
	methods: {
		
	},
}
</script>

<style scoped>
.show {
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
}

.box {
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
</style>
