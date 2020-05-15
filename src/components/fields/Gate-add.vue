<template>
   <v-text-field
    v-model="valueSetter"
     v-mask="'##'"
    :rules="rules"
    prepend-icon="mdi-door"
    label="Gate"
  ></v-text-field>
</template>

<script>
import { mask } from 'vue-the-mask'
const GateField = require('../../class/Gate.js')
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
      class: new GateField(this.value),
      propValue: this.value,
      previousValue: ''
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
        return this.class.gate
      },
      set: function (v) {
        this.class.gate = v
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
