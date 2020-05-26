<template>
	<div :class="helpCon" v-if="attemps % 3 === 0 && attemps > 0 && displayHelp">
		<div class="topHelpCon">
			<p>Do you want help?</p>
			<div class="helpConBtns">
				<button v-on:click="help = true">Yes</button>
				<button v-on:click="helpUser">No</button>
			</div>
		</div>
		<div id="helpVerb" v-if="help">{{ checkParent }}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			help: this.$props.helpProp,
			helpCon: this.$props.helpConProp,
			displayHelp: this.$props.displayHelpProp
		};
	},
	props: {
		displayHelpProp: Boolean,
		helpConProp: String,
		helpProp: Boolean,
		attemps: Number
	},
	computed: {
		checkParent() {
			if (this.$parent.$options._componentTag === 'Definition') {
				return this.$store.getters.randomVerbDef.spanishVerb;
			} else if (this.$parent.$options._componentTag === 'Conjugation') {
				return this.$store.getters.randomVerbConj.conjugation;
			}
			return null;
		}
	},
	created() {},
	methods: {
		helpUser() {
			this.helpCon = 'helpConFadeOut';
			setTimeout(() => {
				this.displayHelp = false;
			}, 900);
		}
	}
};
</script>

<style>
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
