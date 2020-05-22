<template>
	<div>
		<div v-if="loading">Loading</div>
		<div v-else>{{ verbs }}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			help: 'help'
		};
	},
	props: {
		verbs: Array,
		loading: Boolean
	},
	methods: {
		splitter() {
			console.log(this.verbs);
			return this.verbs[0][0];
		}
	},
	computed: {}
};
</script>

<style></style>
