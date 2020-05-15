module.exports = class TerminalField {
  constructor (terminal) {
    this.terminal = terminal
  }

  terminals () {
    return JSON.parse(localStorage.getItem('terminals'))
  }

  add (body) {
    const current = this.terminals()
    current.push({ terminal: body.terminal })
    this.setLocaleStorageItem(current)
  }

  edit (body, index) {
    const current = this.terminals()
    Object.assign(current[index], body)
    this.setLocaleStorageItem(current)
  }

  setLocaleStorageItem (i) {
    localStorage.setItem('terminals', JSON.stringify(i))
  }

  remove (index) {
    const current = this.terminals()
    current.splice(index, 1)
    this.setLocaleStorageItem(current)
  }

  checkDuplicates (v) {
    let duplicate = false
    this.terminals().forEach(d => {
      if (d.terminal === v) {
        duplicate = true
      }
    })
    return duplicate
  }
}
