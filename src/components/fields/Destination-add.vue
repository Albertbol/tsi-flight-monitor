<template>
  <v-text-field
    v-model="valueSetter"
    :rules="rules"
    label="Destination"
     maxlength="60"
    prepend-icon="mdi-city"
    return-object
  ></v-text-field>
</template>

<script>
const DestinationField = require('../../class/Destination.js')
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    add: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      class: new DestinationField(this.value),
      propValue: this.value,
      previousValue: ''
    }
  },
  created () {
    this.previousValue = this.value
  },
  methods: {
    test (v) {
      return !this.class.checkDuplicates(v) || 'This value already exists in the destination'
    }
  },
  computed: {
    valueSetter: {
      get: function () {
        return this.class.destination
      },
      set: function (v) {
        this.class.destination = v
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
