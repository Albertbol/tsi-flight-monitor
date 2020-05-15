module.exports = class StatusField {
  constructor (status) {
    this.status = status
  }

  statuses () {
    return JSON.parse(localStorage.getItem('statuses'))
  }

  add (body) {
    const current = this.statuses()
    current.push({ status: body.status })
    this.setLocaleStorageItem(current)
  }

  edit (body, index) {
    const current = this.statuses()
    Object.assign(current[index], body)
    this.setLocaleStorageItem(current)
  }

  setLocaleStorageItem (i) {
    localStorage.setItem('statuses', JSON.stringify(i))
  }

  remove (index) {
    const current = this.statuses()
    current.splice(index, 1)
    this.setLocaleStorageItem(current)
  }

  checkDuplicates (v) {
    let duplicate = false
    this.statuses().forEach(d => {
      if (d.status === v) {
        duplicate = true
      }
    })
    return duplicate
  }
}
