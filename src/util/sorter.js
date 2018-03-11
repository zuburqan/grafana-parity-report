export class Sorter {
  constructor (options) {
    this.options = options
  }

  sort (rows) {
    return rows.concat().sort((rowA, rowB) => {
      var value = this._sortValueFor(rowA, rowB)
      return this.options.sortMultiplier * value
    })
  }

  toggle (columnName) {
    var multiplier = this.options.sortMultiplier
    var column = this.options.sortColumn

    if (column !== columnName) {
      this.options.sortColumn = columnName
    } else {
      this.options.sortMultiplier = multiplier * -1
    }
  }

  icon (columnName) {
    if (this.options.sortColumn !== columnName) { return null }

    if (this.options.sortMultiplier === 1) {
      return 'fa fa-sort-asc'
    } else {
      return 'fa fa-sort-desc'
    }
  }

  _sortValueFor (rowA, rowB) {
    var column = this.options.sortColumn
    if (column === 'name') {
      return rowA.name.localeCompare(rowB.name)
    } if (column === 'difference') {
      return rowA.difference - rowB.difference
    } else {
      return 0
    }
  }
}
