<template>
	<div class="definition">
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
				<input
					:class="answerInputClass"
					ref="answer"
					type="text"
					placeholder="Answer"
					v-model="answer"
				/>
			</p>
			<button v-on:click="submit">Submit</button>
		</form>

		<Help
			:attemps="attemps"
			:displayHelpProp="displayHelpProp"
			:helpConProp="helpConProp"
			:helpProp="helpProp"
			:key="componentKeyHelp"
		/>
	</div>
</template>

<script>
import { INCREMENT } from '../mutation-types';
import Help from './Help';

export default {
	components: {
		Help
	},
	data() {
		return {
			answer: '',
			answerInputClass: 'answerInput',
			componentKeyHelp: 0,
			helpConProp: 'helpCon',
			attemps: 0,
			helpProp: false,
			displayHelpProp: true
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
			return this.$store.getters.randomVerbDef;
		}
	},
	methods: {
		reRenderHelp() {
			this.componentKeyHelp++;
		},
		submit: function(evt) {
			evt.preventDefault();
			this.$refs.answer.focus();
			if (this.answer === this.randomVerb.conjugation) {
				this.$store.commit(INCREMENT, { verbId: this.randomVerb.id });
				this.answerInputOutCome(true);
				setTimeout(() => {
					this.reRender();
				}, 750);
			} else {
				this.answerInputOutCome(false);
				this.reRenderHelp();
				this.attemps++;
				this.displayHelp = true;
				this.help = false;
				this.helpCon = 'helpCon';
			}
		},
		answerInputOutCome(bool) {
			if (bool) {
				this.answerInputClass = 'answerInputCorrect';
			} else {
				this.answerInputClass = 'answerInputIncorrect';
				setTimeout(() => {
					this.answerInputClass = 'answerInput';
				}, 1000);
			}
		}
	}
};
</script>

<style>
.definition {
	border: 1px solid black;
	height: 50%;
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

#spanishVerb {
	font-weight: 700;
	font-size: 1.25rem;
}

.answerInput {
	font-size: 2rem;
	border-radius: 2rem;
}
.answerInput:focus {
	outline: none;
}
.answerInput[type='text'] {
	padding: 2.5% 5%;
}
.answerInputCorrect {
	border: 3px solid lightgreen;
	font-size: 2rem;
	border-radius: 2rem;
	animation: moveUp 0.5s;
}
.answerInputIncorrect {
	border: 3px solid rgb(235, 136, 136);
	font-size: 2rem;
	border-radius: 2rem;
	animation: shake 0.5s;
}
.answerInputCorrect:focus {
	outline: none;
}
.answerInputIncorrect:focus {
	outline: none;
}
.answerInputCorrect[type='text'] {
	padding: 2.5% 5%;
}
.answerInputIncorrect[type='text'] {
	padding: 2.5% 5%;
}
</style>
