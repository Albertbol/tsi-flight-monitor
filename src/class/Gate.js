module.exports = class GateField {
  constructor (gate) {
    this.gate = gate
  }

  gates () {
    return JSON.parse(localStorage.getItem('gates'))
  }

  add (body) {
    const current = this.gates()
    current.push({ gate: body.gate })
    this.setLocaleStorageItem(current)
  }

  edit (body, index) {
    const current = this.gates()
    Object.assign(current[index], body)
    this.setLocaleStorageItem(current)
  }

  setLocaleStorageItem (i) {
    localStorage.setItem('gates', JSON.stringify(i))
  }

  remove (index) {
    const current = this.gates()
    current.splice(index, 1)
    this.setLocaleStorageItem(current)
  }

  checkDuplicates (v) {
    let duplicate = false
    this.gates().forEach(d => {
      if (d.gate === v) {
        duplicate = true
      }
    })
    return duplicate
  }
}
