<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="valueSetter"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="valueSetter"
        label="Pick time"
        required
        :rules="[v => !!v || 'Field is required']"
        prepend-icon="mdi-clock"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="valueSetter"
      format="24hr"
      full-width
      @click:minute="$refs.menu.save(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      menu: false,
      propValue: this.value,
      time: this.value
    }
  },
  computed: {
    valueSetter: {
      get: function () {
        console.warn(this.time)
        return this.time
      },
      set: function (v) {
        this.time = v
        this.$emit('change', v)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
