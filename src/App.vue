<template>
  <div id="app">
    <IndicativePresent
      v-bind:verbs="verbs"
      :loading="loading"
      :reRender="this.reRender"
      :points="points"
      :key="componentKey"
    />

    <input type="checkbox" id="present" value="Presente" v-model="checkedTenses" />
    <label for="present">Present</label>
    <input type="checkbox" id="past" value="Pretérito" v-model="checkedTenses" />
    <label for="past">Past</label>
    <input type="checkbox" id="imperfect" value="Imperfecto" v-model="checkedTenses" />
    <label for="imperfect">Imperfect</label>
    <input type="checkbox" id="future" value="Futuro" v-model="checkedTenses" />
    <label for="future">Future</label>
    <button v-on:click="fetchTenses">Fetch Selected Tenses</button>
  </div>
</template>

<script>
import IndicativePresent from "./components/IndicativePresent.vue";

export default {
  name: "App",
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
      const baseURI = "http://localhost:4444/api/tense/indicativePresent";
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
      const baseURI = "http://localhost:4444/api/tense/multiTense";
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
