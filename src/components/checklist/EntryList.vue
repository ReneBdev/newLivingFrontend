<template>
	<div class="list" :key="entry.id" v-for="entry in entrylist">
		<Entry v-show="type=='entry'"
            :entry="entry"
			@delete="$emit('delete')"
        />
		<SharedEntry v-show="type=='shared'"
            :entry="entry"
			:code="this.code"
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
        entrylist: Array,
		code: String
    },
	components: {
        Entry,
		SharedEntry
	},
	methods: {
	},
	created() {
	},
	emits: ['delete']
}
</script>
