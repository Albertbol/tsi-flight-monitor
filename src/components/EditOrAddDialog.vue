<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ header }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-form ref="form" v-model="formValid" @submit.prevent="save()">
                  <template v-if="module === 'Flights'">
                    <Destination
                      :value="item.destination"
                      @change="item.destination = $event.destination"
                    />
                    <Terminal
                      :value="item.terminal"
                      @change="item.terminal = $event"
                    />
                    <Time
                      :value="item.time"
                      @change="item.time = $event"
                    />
                    <Gate
                      :value="item.gate"
                      @change="item.gate = $event"
                    />
                    <Status
                      :value="item.status"
                      @change="item.status = $event"
                    />
                  </template>
                <div v-else>
                  <DestinationAdd
                    v-if="module === 'Destinations'"
                    :add="add"
                    :value="item.destination"
                    @change="item.destination = $event"
                  />
                  <TerminalAdd
                    v-if="module === 'Terminals'"
                    :add="add"
                    :value="item.terminal"
                    @change="item.terminal = $event"
                  />
                  <Time
                    v-if="module === 'Times'"
                    :add="add"
                    :value="item.time"
                    @change="item.time = $event"
                  />
                  <GateAdd
                    v-if="module === 'Gates'"
                    :add="add"
                    :value="item.gate"
                    @change="item.gate = $event"
                  />
                  <StatusAdd
                    v-if="module === 'Statuses'"
                    :add="add"
                    :value="item.status"
                    @change="item.status = $event"
                  />
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Destination from './fields/Destination.vue'
import Terminal from './fields/Terminal.vue'
import Time from './fields/Time.vue'
import Gate from './fields/Gate.vue'
import Status from './fields/Status.vue'
import DestinationAdd from './fields/Destination-add.vue'
import TerminalAdd from './fields/Terminal-add.vue'
import GateAdd from './fields/Gate-add.vue'
import StatusAdd from './fields/Status-add.vue'

export default {
  components: {
    Destination,
    Terminal,
    Time,
    Gate,
    Status,
    DestinationAdd,
    TerminalAdd,
    GateAdd,
    StatusAdd
  },
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    add: {
      type: Boolean,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    },
    module: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      test: '',
      formValid: true,
      previousValue: {},
      skelet: {
        terminal: '',
        destination: '',
        time: '',
        gate: '',
        status: ''
      }
    }
  },
  computed: {
    header () {
      return this.add ? 'Add ' + this.module : 'Edit ' + this.module
    }
  },
  created () {
    if (this.add) {
      Object.assign(this.previousValue, this.skelet)
      Object.assign(this.item, this.skelet)
    } else {
      Object.assign(this.previousValue, this.item)
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        this.$emit('save', {
          module: this.module.toLowerCase(),
          body: {
            terminal: this.item.terminal,
            destination: this.item.destination,
            time: this.item.time,
            gate: this.item.gate,
            status: this.item.status,
            add: this.add,
            previousValue: this.previousValue
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
