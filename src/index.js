import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <button @click="increment">Increment</button>
      <p>Count: {{ count }}</p>

      <div v-for="number in evenList">
        <div>
          {{ number }}
        <div> 
      </div>
  `, 
  // span is inline element, div is block element
  data() {
    return {
      count: 0,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  computed: { 
    // computed properties are basically derived data, often subset of existing data
    // can access methods
    evenList() {
      return this.numbers.filter(number => this.isEven(number))
    }
  },

  methods: {
    increment() {
      this.count ++ //this can access anything in the data variable
    },
    isEven(val) {
      return val % 2 === 0
    }
  }
})

app.mount('#app')