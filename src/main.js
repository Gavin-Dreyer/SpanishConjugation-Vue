import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import axios from 'axios';

import {
	INCREMENT,
	FETCHING_VERBS,
	FETCH_VERBS_SUCCESS,
	FETCH_VERBS_FAILURE,
	FETCH_TENSES_FAILURE
} from './mutation-types';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		points: 0,
		verbs: [],
		loading: false,
		error: ''
	},
	mutations: {
		[INCREMENT](state, rVerb) {
			state.points++;
			state.verbs = state.verbs.filter(verb => {
				if (verb.id !== rVerb.verbId) {
					return verb;
				}
			});
		},
		[FETCHING_VERBS](state) {
			state.loading = true;
		},
		[FETCH_VERBS_SUCCESS](state, verbs) {
			state.loading = false;
			state.verbs = verbs;
		},
		[FETCH_VERBS_FAILURE](state, err) {
			state.loading = false;
			state.error = err;
		},
		[FETCH_TENSES_FAILURE](state) {
			state.loading = false;
			state.error = 'No tenses selected';
		}
	},
	getters: {
		randomVerbConj: state => {
			if (state.verbs === 0) return [];
			let v = [];
			//   Randomly selects a verb from the indicative present verbs
			let verb = state.verbs[Math.floor(Math.random() * state.verbs.length)];
			//creates a list of the 6 different points of view
			Object.keys(verb).forEach((item, index) => {
				if (index > 4) {
					v.push({ view: item, conjugation: verb[item], id: verb['id'] });
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
		},
		randomVerbDef(state) {
			if (state.verbs === 0) return [];

			//   Randomly selects a verb from the indicative present verbs
			let verb = state.verbs[Math.floor(Math.random() * state.verbs.length)];

			verb = Object.keys(verb).reduce((acc, item) => {
				if (item === 'englishDefinition' || item === 'spanishVerb') {
					acc = { ...acc, [item]: verb[item] };
				}

				return acc;
			}, {});

			return verb;
		}
	},
	actions: {
		fetchVerbs({ commit }) {
			commit(FETCHING_VERBS);
			const baseURI = 'http://localhost:4444/api/tense/indicativePresent';
			Vue.prototype.$http
				.get(baseURI)
				.then(result => {
					commit(FETCH_VERBS_SUCCESS, result.data);
				})
				.catch(err => commit(FETCH_VERBS_FAILURE, err.response));
		},
		fetchTenses({ commit }, payload) {
			commit(FETCHING_VERBS);
			if (payload.checkedTenses.length === 0)
				return commit(FETCH_TENSES_FAILURE), alert(this.state.error);

			const baseURI = 'http://localhost:4444/api/tense/multiTense';
			Vue.prototype.$http
				.get(baseURI, { params: { tenses: payload.checkedTenses } })
				.then(result => {
					commit(FETCH_VERBS_SUCCESS, result.data);
				})
				.catch(err => commit(FETCH_VERBS_FAILURE, err.response));
		}
	}
});

new Vue({
	store: store,
	render: h => h(App)
}).$mount('#app');
