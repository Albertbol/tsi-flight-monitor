<template>
  <v-text-field
    v-model="valueSetter"
     v-mask="'A'"
     :rules="rules"
    prepend-icon="mdi-airport"
    label="Terminal"
  ></v-text-field>
</template>

<script>
import { mask } from 'vue-the-mask'
const TerminalField = require('../../class/Terminal.js')
export default {
  directives: { mask },
  props: {
    value: {
      type: String,
      deafaul: ''
    },
    add: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      class: new TerminalField(this.value),
      propValue: this.value
    }
  },
  methods: {
    test (v) {
      return !this.class.checkDuplicates(v) || 'This value already exists in the destination'
    }
  },
  computed: {
    valueSetter: {
      get: function () {
        return this.class.terminal
      },
      set: function (v) {
        this.class.terminal = v
        this.$emit('change', v)
      }
    },
    rules () {
      return [
        v => !!v || 'Field is required',
        v => this.test(v)
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
