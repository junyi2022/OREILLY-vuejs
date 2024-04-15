import * as Vue from 'vue/dist/vue.esm-bundler.js'

const Num = {
  props: ['number'],
  template: `
  <button v-bind:class="getClass(number)" @click="click">
    {{ number }}
  </button>
  `,
  methods: {
    click() {
      this.$emit('chosen', this.number) //emit from child to parent
    },
    getClass(number) {
      return this.isEven(number) ? 'blue' : 'red' // can use a method inside another method
    },
    isEven(val) {
      return val % 2 === 0
    }
  }
}

const app = Vue.createApp({
  components: {
    Num
  },

  // data, methods, computed are directly accessible in the template
  template: `
      <num 
        v-for="number in numbers" 
        v-bind:number="number" 
        @chosen="addNumber"
      />

      <hr />
      
      <num 
        v-for="number in numberHistory" 
        v-bind:number="number" 
      />
  `, 
  // span is inline element, div is block element
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      numberHistory: []
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
    addNumber(number) { // number here is the value (this.number) emitted from the child
      console.log(number)
      this.numberHistory.push(number)
    }
  }
})

app.mount('#app')
