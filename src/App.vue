<template>
	<div id="app">
		<IndicativePresent v-bind:verbs="verbs" :loading="loading" />
	</div>
</template>

<script>
import IndicativePresent from './components/IndicativePresent.vue';

export default {
	name: 'App',
	components: {
		IndicativePresent
	},
	data() {
		return {
			verbs: [],
			loading: false
		};
	},
	created() {},
	mounted() {
		this.fetchVerbs();
	},
	methods: {
		fetchVerbs: function() {
			this.loading = true;
			const baseURI = 'http://localhost:4444/api/tense/indicativePresent';
			this.$http
				.get(baseURI)
				.then(result => {
					this.verbs.push(result.data);
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading = false;
					console.log(this.loading);
				});
		}
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
