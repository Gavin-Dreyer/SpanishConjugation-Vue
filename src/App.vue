<template>
	<div id="app">
		<IndicativePresent
			v-bind:verbs="verbs"
			:loading="loading"
			:reRender="this.reRender"
			:key="componentKey"
		/>
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
	</div>
</template>

<script>
import IndicativePresent from './components/IndicativePresent.vue';
import { mapActions } from 'vuex';

export default {
	name: 'App',
	components: {
		IndicativePresent
	},
	data() {
		return {
			verbs: [],
			checkedTenses: [],
			loading: false,
			componentKey: 0
		};
	},
	mounted() {
		this.$store.dispatch('fetchVerbs');
	},
	methods: {
		...mapActions(['fetchTenses']),
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

.tensesCheckbox {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 50%;
	height: 10%;
}

.checkBoxCon {
	display: flex;
	justify-content: space-around;
	width: 100%;
}

.checkBoxes label {
	margin-left: 0.1rem;
}
</style>
