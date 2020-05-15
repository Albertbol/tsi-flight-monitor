<template>
  <v-autocomplete
    v-model="valueSetter"
    :items="getDestinations"
     maxlength="60"
    hide-no-data
    hide-selected
    :rules="[v => !!v || 'Field is required']"
    required
    item-text="destination"
    item-value="destination"
    label="Destination"
    placeholder="Start typing to Search"
    prepend-icon="mdi-city"
    return-object
  ></v-autocomplete>
</template>

<script>
const DestinationField = require('../../class/Destination.js')
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      class: new DestinationField(this.value),
      propValue: this.value
    }
  },
  computed: {
    getDestinations () {
      return this.class.destinations()
    },
    valueSetter: {
      get: function () {
        return this.class.destination
      },
      set: function (v) {
        this.class.destination = v
        this.$emit('change', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
