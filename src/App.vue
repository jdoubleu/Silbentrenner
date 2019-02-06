<template>
  <div id="app">
    <Editor class="side" v-model="text"/>
    <div id="output" class="side" v-html="output" @click="handleOutputClick"></div>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import { debounce } from 'lodash'
import Hyphenator from './lib/Hyphenator'

export default {
  name: 'app',
  components: {
    Editor
  },
  data() {
    return {
      text: '',
      output: ''
    }
  },
  beforeCreate() {
    const h = new Hyphenator()
    this.$h = h.hyphenText.bind(h)
  },
  created() {
    this.debounceInput = debounce(this.hyphenateOutput, 400)
  },
  watch: {
    text() {
      this.debounceInput()
    }
  },
  methods: {
    hyphenateOutput() {
      this.output = this.$h(this.text)
    },
    handleOutputClick(e) {
      const target = e.target

      // select text in element
      const range = document.createRange()
      range.selectNode(target)
      window.getSelection().addRange(range)
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;

  font-size: 18px;
  font-family: 'Monaco', courier, monospace;
}

#app {
  display: flex;
  align-items: stretch;
  justify-items: stretch;
  height: 100%;
  hyphens: auto;
}

#app .side {
  flex: 1;
  padding: 1.5rem;
}

#app .side:first-child {
  border-right: 1px solid grey;
}
</style>
