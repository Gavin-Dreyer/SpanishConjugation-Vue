<template>
	<div id="app">
		<IndicativePresent
			v-bind:verbs="verbs"
			:loading="loading"
			:reRender="this.reRender"
			:points="points"
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
			<button v-on:click="fetchTenses">Fetch Selected Tenses</button>
		</div>
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
			checkedTenses: [],
			loading: false,
			points: 0,
			componentKey: 0
		};
	},
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
					this.verbs = result.data;
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading = false;
				});
		},
		fetchTenses: function() {
			if (this.checkedTenses.length === 0) return;

			this.loading = true;
			const baseURI = 'http://localhost:4444/api/tense/multiTense';
			this.$http
				.get(baseURI, { params: { tenses: this.checkedTenses } })
				.then(result => {
					this.verbs = result.data;
				})
				.catch(err => console.log(err))
				.finally(() => {
					this.loading = false;
				});
		},
		reRender: function() {
			this.componentKey++;
			this.points++;
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
