<template>
  <v-card class="main" elevation="0">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">Flight Departure System</h1>
    </v-card-title>

    <v-tabs v-model="tab" class="mb-4" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-row justify="center" align="center">
          <Table
            :module="item"
            :data="getData(item)"
            :headers="headers[item.toLowerCase()]"
            @save="save($event)"
            @remove="remove($event)"
          />
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Table from './Table.vue'
const faker = require('faker')
const Flight = require('../class/Flights.js')
const Destination = require('../class/Destination.js')
const Terminal = require('../class/Terminal.js')
const Status = require('../class/Status.js')
const Gate = require('../class/Gate.js')

export default {
  components: {
    Table
  },
  data () {
    return {
      tab: null,
      items: ['Flights', 'Destinations', 'Terminals', 'Gates', 'Statuses'],
      headers: {
        flights: [
          { text: 'Flight', value: 'id' },
          { text: 'Terminal', value: 'terminal' },
          { text: 'Destination', value: 'destination' },
          { text: 'Time', value: 'time' },
          { text: 'Gate', value: 'gate' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        destinations: [
          { text: 'Destinations', value: 'destination' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        terminals: [
          { text: 'Terminals', value: 'terminal' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        gates: [
          { text: 'Gates', value: 'gate' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        statuses: [
          { text: 'Statuses', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      },
      destinations: [],
      terminals: [],
      gates: [],
      statuses: [],
      flights: []
    }
  },
  created () {
    if (this.InLocalStorage()) {
      this.statuses = JSON.parse(localStorage.getItem('statuses'))
      this.destinations = JSON.parse(localStorage.getItem('destinations'))
      this.terminals = JSON.parse(localStorage.getItem('terminals'))
      this.gates = JSON.parse(localStorage.getItem('gates'))
      this.flights = JSON.parse(localStorage.getItem('flights'))
    } else {
      this.createFakeData()
    }
  },
  methods: {
    getData (item) {
      return this[item.toLowerCase()]
    },
    InLocalStorage () {
      return (
        localStorage.getItem('statuses') &&
        localStorage.getItem('destinations') &&
        localStorage.getItem('terminals') &&
        localStorage.getItem('gates') &&
        localStorage.getItem('flights')
      )
    },
    createFakeData () {
      this.addDestinations()
      this.addTerminals()
      this.addGates()
      this.addStatuses()
      this.addFlights()
    },
    addDestinations () {
      const randomNumber = this.randomNumber(50, 100)
      for (let step = 0; step < randomNumber; step++) {
        this.destinations.push({ destination: faker.fake('{{address.city}}') })
      }
      localStorage.setItem('destinations', JSON.stringify(this.destinations))
    },
    addTerminals () {
      this.terminals = [
        { terminal: 'A' },
        { terminal: 'B' },
        { terminal: 'C' },
        { terminal: 'D' },
        { terminal: 'E' },
        { terminal: 'F' },
        { terminal: 'G' },
        { terminal: 'H' },
        { terminal: 'K' },
        { terminal: 'L' },
        { terminal: 'M' }
      ]
      localStorage.setItem('terminals', JSON.stringify(this.terminals))
    },
    addGates () {
      const randomNumber = this.randomNumber(20, 40)

      for (let step = 0; step < randomNumber; step++) {
        this.gates.push({ gate: `${step + 1}` })
      }
      localStorage.setItem('gates', JSON.stringify(this.gates))
    },
    addStatuses () {
      this.statuses = [
        { status: 'CHECK-IN' },
        { status: 'ON TIME' },
        { status: 'DELAYED' },
        { status: 'CANCELLED' }
      ]
      localStorage.setItem('statuses', JSON.stringify(this.statuses))
    },
    addFlights () {
      const randomNumber = this.randomNumber(200, 400)
      const FlightsClass = new Flight()
      for (let step = 0; step < randomNumber; step++) {
        const id = FlightsClass.randomId()
        const destination = this.destinations[
          this.randomNumber(0, this.destinations.length - 1)
        ].destination
        const terminal = this.terminals[
          this.randomNumber(0, this.terminals.length - 1)
        ].terminal
        const gate = this.gates[this.randomNumber(0, this.gates.length - 1)]
          .gate
        const status = this.statuses[
          this.randomNumber(0, this.statuses.length - 1)
        ].status
        const h = this.randomNumber(0, 23)
        const m = this.randomNumber(0, 11) * 5
        const time = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`
        this.flights.push(
          new Flight(id, terminal, destination, time, gate, status)
        )
      }
      localStorage.setItem('flights', JSON.stringify(this.flights))
    },
    randomNumber (from, to) {
      return Math.floor(Math.random() * (to - from)) + from
    },
    returnClass (module) {
      if (module === 'flights') {
        return new Flight()
      } else if (module === 'destinations') {
        return new Destination()
      } else if (module === 'gates') {
        return new Gate()
      } else if (module === 'statuses') {
        return new Status()
      } else if (module === 'terminals') {
        return new Terminal()
      }
    },
    save (event) {
      const index = event.editedIndex
      delete event.editedIndex

      if (index < 0 || index === null) {
        this[event.module].push(event.body)
        this.returnClass(event.module).add(event.body)
      } else {
        Object.assign(this[event.module][index], event.body)
        this.returnClass(event.module).edit(event.body, index)
      }
    },
    remove (event) {
      const index = event.editedIndex
      this[event.module].splice(index, 1)
      this.returnClass(event.module).remove(index)
    }
  }
}
</script>

<style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
