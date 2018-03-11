import _ from 'lodash'
import {Builder} from '../../src/util/builder'

describe('Builder', () => {
  let subject

  beforeEach(() => {
    subject = new Builder({})
    subject.scope = { 'first': (series) => { return _.first(series) }, 'last': (series) => { return _.last(series) } }
  })

  describe('call', () => {
    it('builds a list of checks with parsed equations', () => {
      var seriesList = [
        { target: 'a', datapoints: [[1, 'ts'], [2, 'ts']] },
        { target: 'b', datapoints: [[3, 'ts'], [4, 'ts']] }
      ]

      var checks = [
        { name: 'Check1', equation: 'max(a) + mean(b) = 8 * last(a) - max(b)' },
        { name: 'Check2', equation: 'first(a) = first(b)' },
        { name: 'Check3', equation: 'foo = bar' }
      ]

      var expectedMapping = { 'a': [1, 2], 'b': [3, 4] }
      var expectedScope = Object.assign(subject.scope, expectedMapping)

      var expected = [
        { name: 'Check1', equation: 'max(a) + mean(b) = 8 * last(a) - max(b)', scope: expectedScope },
        { name: 'Check2', equation: 'first(a) = first(b)', scope: expectedScope },
        { name: 'Check3', equation: 'foo = bar', scope: expectedScope }
      ]

      expect(subject.call(seriesList, checks)).toEqual(expected)
    })

    it('copes with null values in series', () => {
      var seriesList = [
        { target: 'A', datapoints: [[1, 'ts'], [null, 'ts']] },
        { target: 'B', datapoints: [[null, 'ts'], [2, 'ts']] }
      ]

      var checks = [ { name: 'Check1', equation: 'max(A) = max(B) * 2' } ]

      var expectedMapping = { 'a': [1], 'b': [2] }
      var expectedScope = Object.assign(subject.scope, expectedMapping)

      var expected = [ { name: 'Check1', equation: 'max(A) = max(B) * 2', scope: expectedScope } ]

      expect(subject.call(seriesList, checks)).toEqual(expected)
    })
  })
})
