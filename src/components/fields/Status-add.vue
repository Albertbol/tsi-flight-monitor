<template>
   <v-text-field
    v-model="valueSetter"
     maxlength="60"
     :rules="rules"
    prepend-icon="mdi-information"
    label="Status"
  ></v-text-field>
</template>

<script>
const StatusField = require('../../class/Status.js')
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
      class: new StatusField(this.value),
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
        return this.class.status
      },
      set: function (v) {
        this.class.status = v
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
