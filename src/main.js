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
		[INCREMENT](state) {
			state.points++;
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
