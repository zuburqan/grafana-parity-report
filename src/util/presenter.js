import _ from 'lodash'
import * as math from '../external/math.min'

export class Presenter {
  constructor (options) {
    this.options = options
  }

  call (report) {
    _.forEach(report, (check) => this._setDiff(check))
    _.forEach(report, (check) => this._setColor(check))
    return report
  }

  _setDiff (check) {
    var parts = check.equation.split('=')

    var lhs = math.eval(parts[0], check.scope)
    var rhs = math.eval(parts[1], check.scope)

    var larger = _.max([lhs, rhs])
    if (larger === 0) { return 0 }

    var difference = ((Math.abs(lhs - rhs)) / larger) * 100
    check.difference = parseFloat(this._precisionDiff(difference))
  }

  _setColor (check) {
    var thresholds = this.options.thresholds.concat().sort((a, b) => b.value - a.value)
    var threshold = _.find(thresholds, (threshold) => check.difference >= threshold.value)
    check.color = this._determineColorWith(threshold)
  }

  _precisionDiff (difference) {
    return difference.toFixed(this.options.decimals)
  }

  _determineColorWith (threshold) {
    return threshold ? 'background-color:' + threshold.color : 'background-color:' + this.options.defaultColor
  }
}
