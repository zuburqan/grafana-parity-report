import _ from 'lodash'
import kbn from 'app/core/utils/kbn'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import {Builder} from './util/builder'
import {Presenter} from './util/presenter'
import {Sorter} from './util/sorter'
import * as math from './external/math.min'

const panelDefaults = {
  defaultColor: 'rgb(0,128,0)',
  thresholds: [],
  checks: [],
  format: 'none',
  decimals: 2,
  sortColumn: '',
  sortMultiplier: 1
}

export class ParityReportCtrl extends MetricsPanelCtrl {
  constructor ($scope, $injector) {
    super($scope, $injector)
    _.defaults(this.panel, panelDefaults)

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))

    this.builder = new Builder(this.panel)
    this.presenter = new Presenter(this.panel)
    this.sorter = new Sorter(this.panel)

    this.check = {}
    this.report = {}
  }

  onInitEditMode () {
    this.addEditorTab('Options', 'public/plugins/zuburqan-parity-report-panel/editor.html')
    this.unitFormats = kbn.getUnitFormats()
    this.render()
  }

  onDataReceived (seriesList) {
    this.seriesList = seriesList
    this.render()
  }

  onRender () {
    this.report = this.builder.call(this.seriesList, this.panel.checks)
    this.report = this.presenter.call(this.report)
    this.report = this.sorter.sort(this.report)
    this._formatUnits()
  }

  _formatUnits () {
    var formatFunc = kbn.valueFormats[this.panel.format]

    _.forEach(this.report, (check) => {
      var parts = check.equation.split('=')

      var lhs = formatFunc(math.eval(parts[0], check.scope), this.panel.decimals, null)
      var rhs = formatFunc(math.eval(parts[1], check.scope), this.panel.decimals, null)

      check.equation = `${lhs} = ${rhs}`
    })
  }

  onEditorSetFormat (subitem) {
    this.panel.format = subitem.value
    this.render()
  }

  onEditorAddCheck () {
    this.panel.checks.push({ equation: 'max(1,2,3) + mean(1,2,3) = gcd(1,2,3) * 2', name: 'Check Name' })
    this.render()
  }

  onEditorRemoveCheck (index) {
    this.panel.checks.splice(index, 1)
    this.render()
  }

  onEditorAddThreshold () {
    this.panel.thresholds.push({ value: 0, color: this.panel.defaultColor })
    this.render()
  }

  onEditorRemoveThreshold (index) {
    this.panel.thresholds.splice(index, 1)
    this.render()
  }

  sortIcon (columnName) {
    return this.sorter.icon(columnName)
  }

  onColumnClick (columnName) {
    this.sorter.toggle(columnName)
    this.render()
  }
}

ParityReportCtrl.templateUrl = 'module.html'
export { ParityReportCtrl as PanelCtrl }
