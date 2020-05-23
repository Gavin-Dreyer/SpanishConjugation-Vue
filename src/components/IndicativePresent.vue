<template>
  <div>
    <div v-if="loading">Loading</div>
    <div v-else-if="verbs.length > 0">
      <p>Conjugate {{ randomVerb.spanishVerb }} into {{ randomVerb.view }}</p>
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

      let v = [];
      //   Randomly selects a verb from the indicative present verbs
      let verb = this.verbs[0][
        Math.floor(Math.random() * this.verbs[0].length)
      ];

      //creates a list of the 6 different points of view
      Object.keys(verb).forEach((item, index) => {
        if (index > 4) {
          v.push({ view: item, conjugation: verb[item] });
        }
      });

      //randomly select a view and format it
      v = v[Math.floor(Math.random() * v.length)];
      v["view"] = v["view"]
        .split("")
        .map((letter, index) => {
          if (index === 0) {
            return (letter = letter.toUpperCase());
          } else if (letter.match(/[A-Z]/)) {
            return (letter = " " + letter);
          } else {
            return letter;
          }
        })
        .join("");

      return { spanishVerb: verb.spanishVerb, ...v };
    }
  },
  methods: {
    submit: function(evt) {
      evt.preventDefault();
      if (this.answer === this.randomVerb.conjugation) this.reRender();
    }
  }
};
</script>

<style></style>
