<template>
  <div id="app">
    <header>
      <h1>Silbentrenner</h1>
      <span>language: <a href="https://github.com/jdoubleu/Silbentrenner#language">german</a></span>
      <ColorSelect v-model="colors"/>
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
import ColorSelect from './components/ColorSelect.vue'
import { debounce } from 'lodash'
import Hyphenator from './lib/Hyphenator'

const outputPlaceholder = '<span style="color: #bcbcbc;">Ausgabe</span>'

export default {
  name: 'app',
  components: {
    Editor,
    ColorSelect
  },
  data() {
    return {
      text: '',
      output: outputPlaceholder,
      colors: []
    }
  },
  beforeCreate() {
    this.$h = new Hyphenator(this.colors)
  },
  created() {
    this.debounceInput = debounce(this.hyphenateOutput, 400)
  },
  watch: {
    text() {
      this.debounceInput()
    },
    colors(colors) {
      this.$h.colors = colors
      this.hyphenateOutput()
    }
  },
  methods: {
    hyphenateOutput() {
      this.output = this.text ? this.$h.colorizeText(this.text) : outputPlaceholder
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
