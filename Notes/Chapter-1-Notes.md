# Chapter 1: Introduction
## Get start
``` sh
yarn add vue
yarn add vite --dev
yarn install
```
```--dev``` means Install as dev dependency   
Preview:  
```yarn vite src```  

### Base template
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

  <div id="app"></div>

  <script type="module" src="/index.js"></script>
</body>
</html>
```

## Directives (v-if, v-else)
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  template: `
      <button @click="increment">Increment</button>
      <p>Count: {{ count }}</p>
      <div v-if="isEven()">Even</div>
      <div v-else>Odd</div>
  `, // if function doesn't have argument, the click part doesn't need ()
  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count ++ //this can access anything in the data variable
    },
    isEven() {
      return this.count % 2 === 0
    }
  }
})

app.mount('#app')
```

## Directives (v-if, v-else, v-for)
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  template: `
      <div v-for="number in numbers">
        <div>
          {{ number }}
          <span v-if="isEven(number)">Even</span>
          <span v-else>Odd</span>
        <div> 
      </div>
  `, 
  // span is inline element, div is block element
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },

  methods: {
    isEven(val) {
      return val % 2 === 0
    }
  }
})

app.mount('#app')
```

## Computer Properties
__3 most important things in Vue:__  
SFC  
v-model  
computed properties   
__Why computed properties are helpful__  
1.  Reactive: automatically recompute and update the DOM when data changes 
2.  Can move your logic out of the template (template as simple as possible) and down into the script  

```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <div v-for="number in evenList">
        <div>
          {{ number }}
        <div> 
      </div>
  `, 
  // span is inline element, div is block element
  data() {
    return {
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
    isEven(val) {
      return val % 2 === 0
    }
  }
})

app.mount('#app')
```

## Class Bindings
```html
<style>
    .blue {color: blue;}
    .red {color: red;}
  </style>
  ```
```v-bind:class="isEven(number) : 'blue': 'red'"```  
1. let us execute a JS expression inside this class  
2. However, this add too much complexity to the template, and ideally we need to move those to method (see below)   
3. Another benefit for the below method is that if use Typescript, able to get full type definition - full type safety   
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <div v-for="number in numbers" v-bind:class="getClass(number)">
        <div>
          {{ number }}
        <div> 
      </div>
  `, 
  // span is inline element, div is block element
  data() {
    return {
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
    getClass(number) {
      return this.isEven(number) ? 'blue' : 'red' // can use a method inside another method
    },
    isEven(val) {
      return val % 2 === 0
    }
  }
})

app.mount('#app')
```

## Input Validation
__form validation__  
```v-bind``` can be used in any attribute, not just class   
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <input v-bind:value="value" @input="input" />
      <div class="red">
        {{ error }}
      </div>
  `, 
  // span is inline element, div is block element
  data() {
    return {
      value: 'user'
    }
  },

  computed: { 
    // computed properties are basically derived data, often subset of existing data
    // can access methods
    error() {
      if (this.value.length < 5) {
        return 'Must be greater than 5.'
      }
    }
  },

  methods: {
    input($event) { // you can pass a method or a value to a method, but if you don't, we will get the native JS event by default
      this.value = $event.target.value // $event.target.value is the current value of the input
    }
  }
})

app.mount('#app')
```

## v-model
v-model = v-bind:value + v-on:input   
Another way to do the above:  
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <input v-model="value" />
      <div class="red">
        {{ error }}
      </div>
  `, 
  // span is inline element, div is block element
  data() {
    return {
      value: 'user'
    }
  },

  computed: { 
    // computed properties are basically derived data, often subset of existing data
    // can access methods
    error() {
      if (this.value.length < 5) {
        return 'Must be greater than 5.'
      }
    }
  }
})

app.mount('#app')
```
v-model can also function on other input types, such as radio buttons, checkboxes, and select dropdowns.  
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <input type="radio" v-model="value" value="a"/>
      <input type="radio" v-model="value" value="b"/>
      {{ value }}
  `, 
  // span is inline element, div is block element
  data() {
    return {
      value: 'a'
    }
  }
})

app.mount('#app')
```

```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'
const app = Vue.createApp({
  // data, methods, computed are directly accessible in the template
  template: `
      <input type="checkbox" v-model="value" value="a"/>
      <input type="checkbox" v-model="value" value="b"/>
      {{ value }}
  `, 
  // span is inline element, div is block element
  data() {
    return {
      value: ['a']
    }
  }
})

app.mount('#app')
```

## Component
Vue.js and react.js are component frameworks  
```Vue.createApp``` is a component   
__component:__ object with options (template, data, methods, computed, etc.)   
__Note:__ html is case-insensitive, better to put component tag in lowercase even if you name it in uppercase  
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'

const Hello = {
  template: `
    <p>{{ greeting }}!</p>
  `
}

const app = Vue.createApp({
  components: {
    Hello
  },

  // data, methods, computed are directly accessible in the template
  template: `
      <hello />
  `
})

app.mount('#app')
```

## Component Props
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'

const Hello = {
  props: ['greeting'],
  template: `
    <p>{{ greeting }}!</p>
  `
}

const app = Vue.createApp({
  components: {
    Hello
  },

  // data, methods, computed are directly accessible in the template
  template: `
      <hello greeting="Hello" />
      <hello greeting="Hi" />
  `
})

app.mount('#app')
```
props + method
```js
import * as Vue from 'vue/dist/vue.esm-bundler.js'

const Num = {
  props: ['number'],
  template: `
  <div v-bind:class="getClass(number)">
    {{ number }}
  </div>
  `,
  methods: {
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
      <num v-for="number in numbers" v-bind:number="number" />
  `, 
  // span is inline element, div is block element
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
})

app.mount('#app')
```

## Child-parent Communication
```js
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
      this.numberHistory.push(number) // use this to access numberHistory in the data
    }
  }
})

app.mount('#app')
```
