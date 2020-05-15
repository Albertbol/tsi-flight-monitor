const faker = require('faker')

module.exports = class Flight {
  constructor (id, terminal, destination, time, gate, status) {
    this.id = id
    this.terminal = terminal
    this.destination = destination
    this.time = time
    this.gate = gate
    this.status = status
  }

  randomId () {
    return faker
      .fake('{{random.uuid}}')
      .substring(0, 6)
      .toUpperCase()
  }

  edit (body, index) {
    const current = this.getFlights()
    Object.assign(current[index], body)
    this.setLocaleStorageItem(current)
  }

  setLocaleStorageItem (i) {
    localStorage.setItem('flights', JSON.stringify(i))
  }

  getFlights () {
    return JSON.parse(localStorage.getItem('flights'))
  }

  remove (index) {
    const current = this.getFlights()
    current.splice(index, 1)
    this.setLocaleStorageItem(current)
  }

  add (body) {
    delete body.previousValue
    delete body.add
    Object.assign(body, { id: this.randomId() })
    const current = this.getFlights()
    current.push(body)
    this.setLocaleStorageItem(current)
  }
}
