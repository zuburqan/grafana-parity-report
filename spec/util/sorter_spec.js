import {Sorter} from '../../src/util/sorter'

describe('Sorter', () => {
  let subject
  let options
  let rows

  beforeEach(() => {
    options = { sortColumn: 'name', sortMultiplier: 1 }
    subject = new Sorter(options)
  })

  describe('icon', () => {
    it('returns null when no column is selected', () => {
      expect(subject.icon('')).toBeNull()
    })

    it('returns sort-asc on selection', () => {
      expect(subject.icon('name')).toEqual('fa fa-sort-asc')
    })

    it('returns sort-desc on selection', () => {
      options.sortMultiplier = -1
      expect(subject.icon('name')).toEqual('fa fa-sort-desc')
    })
  })

  describe('toggle', () => {
    it('selects the column if not already selected', () => {
      subject.toggle('difference')
      expect(options.sortColumn).toEqual('difference')
    })

    it('toggles the sort direction if the column is already selected', () => {
      subject.toggle('name')
      expect(options.sortMultiplier).toEqual(-1)
    })
  })

  describe('sort', () => {
    beforeEach(() => {
      rows = [
        { name: 'Check2', difference: 10 },
        { name: 'Check3', difference: 5 },
        { name: 'Check1', difference: 15 }
      ]
    })

    it('sorts by name when it is selected', () => {
      var result = subject.sort(rows)
      expect(result[0].name).toEqual('Check1')
      expect(result[1].name).toEqual('Check2')
      expect(result[2].name).toEqual('Check3')
    })

    it('reverses names order when the sort multiplier is -1', () => {
      options.sortMultiplier = -1
      var result = subject.sort(rows)
      expect(result[0].name).toEqual('Check3')
      expect(result[1].name).toEqual('Check2')
      expect(result[2].name).toEqual('Check1')
    })

    it('sorts by difference when it is selected', () => {
      options.sortColumn = 'difference'
      var result = subject.sort(rows)
      expect(result[0].difference).toEqual(5)
      expect(result[1].difference).toEqual(10)
      expect(result[2].difference).toEqual(15)
    })

    it('reverses differences order when the sort multiplier is -1', () => {
      options.sortColumn = 'difference'
      options.sortMultiplier = -1
      var result = subject.sort(rows)
      expect(result[0].difference).toEqual(15)
      expect(result[1].difference).toEqual(10)
      expect(result[2].difference).toEqual(5)
    })
  })
})
