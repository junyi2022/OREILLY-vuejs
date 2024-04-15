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
      <button @click="increment">Increment</button>
      <p>Count: {{ count }}</p>

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
      count: 0,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
```

## Class Bindings
