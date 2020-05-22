<template>
	<div>
		<div v-if="loading">Loading</div>
		<div v-else>{{ verbs }}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		verbs: Array,
		loading: Boolean
	},
	methods: {},
	computed: {}
};
</script>

<style></style>
