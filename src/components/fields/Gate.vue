<template>
  <v-select
    v-model="valueSetter"
    :items="getGates"
    item-text="gate"
    :rules="[v => !!v || 'Field is required']"
    item-value="gate"
    required
    prepend-icon="mdi-door"
    label="Gate"
  ></v-select>
</template>

<script>
const GateField = require('../../class/Gate.js')
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      class: new GateField(this.value),
      propValue: this.value
    }
  },
  computed: {
    getGates () {
      return this.class.gates()
    },
    valueSetter: {
      get: function () {
        return this.class.gate
      },
      set: function (v) {
        this.class.gate = v
        this.$emit('change', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
