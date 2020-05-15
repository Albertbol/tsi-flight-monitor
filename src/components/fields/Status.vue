<template>
  <v-select
    v-model="valueSetter"
    :items="getStatuses"
    item-text="status"
     maxlength="60"
    :rules="[v => !!v || 'Field is required']"
    item-value="status"
    required
    prepend-icon="mdi-information"
    label="Status"
  ></v-select>
</template>

<script>
const StatusField = require('../../class/Status.js')
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      class: new StatusField(this.value),
      propValue: this.value
    }
  },
  computed: {
    getStatuses () {
      return this.class.statuses()
    },
    valueSetter: {
      get: function () {
        return this.class.status
      },
      set: function (v) {
        this.class.status = v
        this.$emit('change', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
