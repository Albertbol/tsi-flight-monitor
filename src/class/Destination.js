
module.exports = class Destination {
  constructor (destination) {
    this.destination = destination
  }

  destinations () {
    return JSON.parse(localStorage.getItem('destinations'))
  }

  add (body) {
    const current = this.destinations()
    current.push({ destination: body.destination })
    this.setLocaleStorageItem(current)
  }

  edit (body, index) {
    const current = this.destinations()
    Object.assign(current[index], body)
    this.setLocaleStorageItem(current)
  }

  setLocaleStorageItem (i) {
    localStorage.setItem('destinations', JSON.stringify(i))
  }

  remove (index) {
    const current = this.destinations()
    current.splice(index, 1)
    this.setLocaleStorageItem(current)
  }

  checkDuplicates (v) {
    let duplicate = false
    this.destinations().forEach(d => {
      if (d.destination === v) {
        duplicate = true
      }
    })
    return duplicate
  }
}
