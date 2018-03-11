import _ from 'lodash'
import {Presenter} from '../../src/util/presenter'

describe('Presenter', () => {
  let scope
  let subject

  beforeEach(() => {
    var defaultOptions = {
      defaultColor: 'green',
      decimals: 2,
      thresholds: [
        { value: 20, color: 'amber' },
        { value: 50, color: 'red' }
      ]
    }
    subject = new Presenter(defaultOptions)
    scope = { 'a': [4, 2], 'b': [3, 6], 'c': [6, 600], 'first': (series) => { return _.first(series) }, 'last': (series) => { return _.last(series) } }
  })

  describe('call', () => {
    it('sets the percentage differences & colors as per thresholds', () => {
      var report = [
        { name: 'Check1', equation: 'max(a) + min(b) = first(c)', scope: scope },
        { name: 'Check2', equation: 'first(a) = last(b)', scope: scope },
        { name: 'Check3', equation: 'mean(a) = mean(c)', scope: scope }
      ]

      var expected = [
        { name: 'Check1', difference: 14.29, equation: 'max(a) + min(b) = first(c)', color: 'background-color:green', scope: scope },
        { name: 'Check2', difference: 33.33, equation: 'first(a) = last(b)', color: 'background-color:amber', scope: scope },
        { name: 'Check3', difference: 99.01, equation: 'mean(a) = mean(c)', color: 'background-color:red', scope: scope }
      ]

      expect(subject.call(report)).toEqual(expected)
    })

    it('throws an error when equation has undefined symbols', () => {
      var report = [ { name: 'Check1', equation: 'foo = bar', scope: scope } ]

      expect(() => { new Presenter({}).call(report) }).toThrow(new Error('Undefined symbol foo'))
    })
  })
})
