<template>
  <div id="app">
    <header>
      <h1>Silbentrenner</h1>
      <span>language: german</span>
      <a href="https://github.com/jdoubleu/Silbentrenner">source code</a>
    </header>
    <main>
      <Editor v-model="text"/>
      <div v-html="output" @click="handleOutputClick"></div>
    </main>
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
  overflow: hidden;

  font-size: 18px;
  font-family: 'Monaco', courier, monospace;
}

html,
body,
#app {
  height: 100%;
}

header,
main {
  position: relative;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 0 5px #696969;
  z-index: 10;
}

header h1 {
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
}

main {
  display: flex;
  align-items: stretch;
  justify-items: stretch;
  height: 100%;
  hyphens: auto;
}

main > * {
  flex: 1;
  padding: 1.5rem;
}

main > *:first-child {
  border-right: 1px solid grey;
}
</style>
