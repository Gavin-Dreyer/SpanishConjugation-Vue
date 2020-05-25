<template>
	<div>
		<div v-if="this.$store.state.loading">Loading</div>
		<div v-else-if="this.$store.state.verbs.length > 0">
			<p>
				Conjugate
				<span id="spanishVerb">{{ randomVerb.spanishVerb }}</span>
				into {{ randomVerb.view }}
			</p>
			<p>Tense: {{ randomVerb.tense }}</p>
			<p>Mood: {{ randomVerb.mood }}</p>
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
		points: Number,
		reRender: Function
	},
	created() {},
	mounted() {
		this.$refs.answer.focus();
	},
	computed: {
		randomVerb() {
			if (this.$store.state.verbs === 0) return [];
			let v = [];
			//   Randomly selects a verb from the indicative present verbs
			let verb = this.$store.state.verbs[
				Math.floor(Math.random() * this.$store.state.verbs.length)
			];
			//creates a list of the 6 different points of view
			Object.keys(verb).forEach((item, index) => {
				if (index > 4) {
					v.push({ view: item, conjugation: verb[item] });
				}
			});
			//randomly select a view and format it
			v = v[Math.floor(Math.random() * v.length)];
			v['view'] = v['view']
				.split('')
				.map((letter, index) => {
					if (index === 0) {
						return (letter = letter.toUpperCase());
					} else if (letter.match(/[A-Z]/)) {
						return (letter = ' ' + letter);
					} else {
						return letter;
					}
				})
				.join('');
			return {
				spanishVerb: verb.spanishVerb,
				tense: verb.tense,
				mood: verb.mood,
				...v
			};
		}
	},
	methods: {
		submit: function(evt) {
			evt.preventDefault();
			this.$refs.answer.focus();
			if (this.answer === this.randomVerb.conjugation)
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
