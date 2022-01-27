<template>
	<div class="list" :key="entry.id" v-for="entry in entrylist">
		<Entry v-show="type=='entry'"
            :entry="entry"
        />
		<SharedEntry v-show="type=='shared'"
            :entry="entry"
        />
	</div>
</template>

<script>
import Entry from './Entry.vue'
import SharedEntry from './SharedEntry.vue'
export default {
	name: 'EntryList',
    props: {
		type: String,
        entrylist: Array
    },
	components: {
        Entry,
		SharedEntry
	},
	methods: {
	},
	created() {
	}
}
</script>
