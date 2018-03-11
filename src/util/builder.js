import _ from 'lodash'

export class Builder {
  constructor (options) {
    this.options = options
    this.scope = { 'first': (series) => { return _.first(series) }, 'last': (series) => { return _.last(series) } }
  }

  call (seriesList = [], checks) {
    this._targetToSeriesMapping(seriesList)
    var equations = _.map(checks, 'equation')

    return _.map(equations, (eqn, index) => this._build(checks[index], eqn))
  }

  _targetToSeriesMapping (seriesList) {
    _.forEach(seriesList, (series) => {
      this.scope[series.target] = this._values(this._cleanup(series))
    })
  }

  _build (check, eqn) {
    return { name: check['name'], equation: eqn, scope: this.scope }
  }

  _cleanup (series) {
    if (series !== undefined) {
      return _.filter(series.datapoints, (point) => point[0] != null)
    }
  }

  _values (datapoints) {
    return _.map(datapoints, (datapoint) => datapoint[0])
  }
}
