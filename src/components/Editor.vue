<template>
  <textarea v-model="value" id="editor" placeholder="Eingabe" autofocus required></textarea>
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
#editor {
  background-color: #f6f6f6;
  border: 0;
  resize: none;
  outline: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  font-size: inherit;
}
</style>
