<template>
	<div>
		<div v-if="this.$store.state.loading">Loading</div>
		<div v-else-if="this.$store.state.verbs.length > 0">
			<p>
				Translate
				<span id="spanishVerb">{{ randomVerb.englishDefinition }}</span>
			</p>
			<p>{{ this.$store.state.points }}</p>
		</div>
		<form id="inputForm">
			<p>
				<input ref="answer" type="text" placeholder="Answer" v-model="answer" />
			</p>
			<button v-on:click="submit">Submit</button>
		</form>
	</div>
</template>

<script>
import { INCREMENT } from '../mutation-types';
export default {
	data() {
		return {
			answer: ''
		};
	},
	props: {
		reRender: Function
	},
	created() {},
	mounted() {
		this.$refs.answer.focus();
	},
	computed: {
		randomVerb() {
			if (this.$store.state.verbs === 0) return [];

			//   Randomly selects a verb from the indicative present verbs
			let verb = this.$store.state.verbs[
				Math.floor(Math.random() * this.$store.state.verbs.length)
			];

			verb = Object.keys(verb).reduce((acc, item) => {
				if (item === 'englishDefinition' || item === 'spanishVerb') {
					acc = { ...acc, [item]: verb[item] };
				}

				return acc;
			}, {});

			return verb;
		}
	},
	methods: {
		submit: function(evt) {
			evt.preventDefault();
			this.$refs.answer.focus();
			if (this.answer === this.randomVerb.spanishVerb)
				this.reRender(), this.$store.commit(INCREMENT);
		}
	}
};
</script>

<style>
#spanishVerb {
	font-weight: 700;
	font-size: 1.25rem;
}
</style>
