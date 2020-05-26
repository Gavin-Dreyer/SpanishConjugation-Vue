<template>
	<div class="conjugationComp">
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
		<div class="tensesCheckbox">
			<div class="checkBoxCon">
				<div class="checkBoxes">
					<input
						type="checkbox"
						id="present"
						value="Presente"
						v-model="checkedTenses"
					/>
					<label for="present">Present</label>
				</div>
				<div class="checkBoxes">
					<input
						type="checkbox"
						id="past"
						value="Pretérito"
						v-model="checkedTenses"
					/>
					<label for="past">Past</label>
				</div>
				<div class="checkBoxes">
					<input
						type="checkbox"
						id="imperfect"
						value="Imperfecto"
						v-model="checkedTenses"
					/>
					<label for="imperfect">Imperfect</label>
				</div>
				<div class="checkBoxes">
					<input
						type="checkbox"
						id="future"
						value="Futuro"
						v-model="checkedTenses"
					/>
					<label for="future">Future</label>
				</div>
			</div>
			<button v-on:click="fetchTenses({ checkedTenses })">
				Fetch Selected Tenses
			</button>
		</div>
		<div
			:class="helpCon"
			v-if="attemps % 3 === 0 && attemps > 0 && displayHelp"
		>
			<div class="topHelpCon">
				<p>Do you want help?</p>
				<div class="helpConBtns">
					<button v-on:click="help = true">Yes</button>
					<button v-on:click="helpUser">No</button>
				</div>
			</div>
			<div id="helpVerb" v-if="help">{{ this.randomVerb.conjugation }}</div>
		</div>
	</div>
</template>

<script>
import { INCREMENT } from '../mutation-types';
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			answer: '',
			answerInputClass: 'answerInput',
			helpCon: 'helpCon',
			checkedTenses: [],
			attemps: 0,
			help: false,
			displayHelp: true
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
		...mapActions(['fetchTenses']),
		submit: function(evt) {
			evt.preventDefault();
			this.$refs.answer.focus();
			if (this.answer === this.randomVerb.conjugation) {
				this.$store.commit(INCREMENT);
				this.answerInputOutCome(true);

				setTimeout(() => {
					this.reRender();
				}, 1000);
			} else {
				this.answerInputOutCome(false);
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
		},
		helpUser() {
			this.helpCon = 'helpConFadeOut';
			setTimeout(() => {
				this.displayHelp = false;
			}, 900);
			return;
		}
	}
};
</script>

<style>
.conjugationComp {
	height: 100%;
}
#spanishVerb {
	font-weight: 700;
	font-size: 1.5rem;
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

.tensesCheckbox {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
	height: 20%;
}

.checkBoxCon {
	display: flex;
	justify-content: space-around;
	width: 100%;
}

.checkBoxes label {
	margin-left: 0.1rem;
}

.helpCon {
	height: 30%;
	border: 1px solid black;
	animation: fadeIn ease 1s;
}

.helpCon p {
	font-size: 1.25rem;
}

.helpConFadeOut {
	height: 30%;
	border: 1px solid black;
	animation: fadeOut ease 1s;
}

.helpConFadeOut p {
	font-size: 1.25rem;
}

.topHelpCon {
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}

.helpConBtns {
	display: flex;
	justify-content: space-evenly;
}

.helpConBtns button {
	font-size: 1.25rem;
	width: 25%;
	border: 1px solid black;
	border-radius: 5%;
}

.helpConBtns button:focus {
	outline: none;
}

.helpConBtns button:hover {
	background-color: black;
	color: white;
	transition: background-color 0.25s;
}

#helpVerb {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 30%;
	animation: fadeIn ease 1s;
	font-size: 2rem;
	font-weight: 700;
}

@keyframes shake {
	0% {
		transform: translate(3px, 0px);
	}
	10% {
		transform: translate(-3px, 0px);
	}
	20% {
		transform: translate(3px, 0px);
	}
	30% {
		transform: translate(-3px, 0px);
	}
	40% {
		transform: translate(0px, 0px);
	}
}

@keyframes moveUp {
	0% {
		transform: translate(0px, 0px);
	}
	10% {
		transform: translate(0px, -5px);
	}
	20% {
		transform: translate(0px, -10px);
	}
	30% {
		transform: translate(0px, -5px);
	}
	40% {
		transform: translate(0px, 0px);
	}
}

@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>
