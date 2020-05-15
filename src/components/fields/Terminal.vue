<template>
  <v-select
    v-model="valueSetter"
    :items="getTerminals"
    item-text="terminal"
    item-value="terminal"
    :rules="[v => !!v || 'Field is required']"
    required
    prepend-icon="mdi-airport"
    label="Terminal"
  ></v-select>
</template>

<script>
const TerminalField = require('../../class/Terminal.js')
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      class: new TerminalField(this.value),
      propValue: this.value
    }
  },
  computed: {
    getTerminals () {
      return this.class.terminals()
    },
    valueSetter: {
      get: function () {
        return this.class.terminal
      },
      set: function (v) {
        this.class.terminal = v
        this.$emit('change', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
