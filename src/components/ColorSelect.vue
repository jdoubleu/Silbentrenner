<template>
  <div id="color-select">
    <label for="color-select--select">Color scheme: </label>
    <select v-model="selected" id="color-select--select">
      <option v-for="(_, name) in colors" :key="name" :value="name">{{ name }}</option>
    </select>
  </div>
</template>

<script>
const colors = {
  'Monokai': ['#272822', '#F92672', '#66D9EF', '#A6E22E', 'FD971F'],
  'blue-red': ['#00f', '#f00']
}

export default {
  name: 'ColorSelect',
  data() {
    return {
      colors,
      selected: null
    }
  },
  created() {
    this.selected = Object.keys(this.colors)[0]
  },
  watch: {
    selected(name) {
      this.$emit('input', this.colors[name])
    }
  }
}
</script>
