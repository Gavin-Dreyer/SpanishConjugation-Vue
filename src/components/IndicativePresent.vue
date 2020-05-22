<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else-if="verbs.length > 0">
      <p>{{ randomVerb.spanishVerb }}</p>
      <p>{{ points }}</p>
    </div>
    <form id="inputForm">
      <p>
        <input type="text" placeholder="Answer" v-model="answer" />
      </p>
      <button v-on:click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      answer: ""
    };
  },
  props: {
    verbs: Array,
    loading: Boolean,
    points: Number,
    reRender: Function
  },
  created() {},
  mounted() {},
  computed: {
    randomVerb() {
      if (this.verbs.length === 0) return [];
      return this.verbs[0][Math.floor(Math.random() * this.verbs[0].length)];
    }
  },
  methods: {
    submit: function(evt) {
      evt.preventDefault();
      if (this.answer === this.randomVerb.firstPersonSingular) this.reRender();
    }
  }
};
</script>

<style></style>
