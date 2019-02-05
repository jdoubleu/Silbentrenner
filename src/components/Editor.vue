<template>
  <div id="editor">
    <textarea v-model="value" placeholder="Eingabe" autofocus required></textarea>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>
#editor textarea {
  border: 0;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  padding: 1.5rem;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  font-size: inherit;
}
</style>
