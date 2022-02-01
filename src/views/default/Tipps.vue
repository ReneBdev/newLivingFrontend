<template>
    <h1>Tipps</h1>
	<div class="a" :key="tipp" v-for="tipp in tipps">
		<Dropdown 
            :title="tipp.name"
            :content="tipp.text"
        />
	</div>
</template>

<script>
import Dropdown from '@/components/other/Dropdown.vue'

export default {
	name: 'Tipps',
    data() {
        return {
            tipps: []
        }
    },
	components: {
        Dropdown,
	},
	methods: {
		
	},
    async created() {
        const response = await fetch('api/tipp')
        this.tipps = await response.json()
        console.log(tipps)
    }
}
</script>
