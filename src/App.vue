<template>
	<div id="app">
		<Conjugation v-bind:reRender="this.reRender" :key="componentKey" />
		<!-- <Definition v-bind:reRender="this.reRender" :key="componentKey" /> -->
	</div>
</template>

<script>
import Conjugation from './components/Conjugation.vue';
// // import Definition from './components/Definition.vue';

export default {
	name: 'App',
	components: {
		Conjugation
		// Definition
	},
	data() {
		return {
			componentKey: 0
		};
	},
	mounted() {
		this.$store.dispatch('fetchVerbs');
	},
	methods: {
		reRender: function() {
			this.componentKey++;
		}
	}
};
</script>

<style>
html {
	height: 100%;
}

body {
	height: 100%;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
