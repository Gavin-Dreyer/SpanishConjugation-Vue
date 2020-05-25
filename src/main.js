import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		points: 0
	},
	mutations: {
		increment(state) {
			state.points++;
		}
	}
});

new Vue({
	store: store,
	render: h => h(App)
}).$mount('#app');
