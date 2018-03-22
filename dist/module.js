'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelCtrl = exports.ParityReportCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _kbn = require('app/core/utils/kbn');

var _kbn2 = _interopRequireDefault(_kbn);

var _sdk = require('app/plugins/sdk');

var _builder = require('./util/builder');

var _presenter = require('./util/presenter');

var _sorter = require('./util/sorter');

var _math = require('./external/math.min');

var math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelDefaults = {
  defaultColor: 'rgb(0,128,0)',
  thresholds: [],
  checks: [],
  format: 'none',
  decimals: 2,
  sortColumn: '',
  sortMultiplier: 1
};

var ParityReportCtrl = exports.ParityReportCtrl = function (_MetricsPanelCtrl) {
  _inherits(ParityReportCtrl, _MetricsPanelCtrl);

  function ParityReportCtrl($scope, $injector) {
    _classCallCheck(this, ParityReportCtrl);

    var _this = _possibleConstructorReturn(this, (ParityReportCtrl.__proto__ || Object.getPrototypeOf(ParityReportCtrl)).call(this, $scope, $injector));

    _lodash2.default.defaults(_this.panel, panelDefaults);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
    _this.events.on('data-received', _this.onDataReceived.bind(_this));
    _this.events.on('render', _this.onRender.bind(_this));

    _this.builder = new _builder.Builder(_this.panel);
    _this.presenter = new _presenter.Presenter(_this.panel);
    _this.sorter = new _sorter.Sorter(_this.panel);

    _this.check = {};
    _this.report = {};
    return _this;
  }

  _createClass(ParityReportCtrl, [{
    key: 'onInitEditMode',
    value: function onInitEditMode() {
      this.addEditorTab('Options', 'public/plugins/zuburqan-parity-report-panel/editor.html');
      this.unitFormats = _kbn2.default.getUnitFormats();
      this.render();
    }
  }, {
    key: 'onDataReceived',
    value: function onDataReceived(seriesList) {
      this.seriesList = seriesList;
      this.render();
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      this.report = this.builder.call(this.seriesList, this.panel.checks);
      this.report = this.presenter.call(this.report);
      this.report = this.sorter.sort(this.report);
      this._formatUnits();
    }
  }, {
    key: '_formatUnits',
    value: function _formatUnits() {
      var _this2 = this;

      var formatFunc = _kbn2.default.valueFormats[this.panel.format];

      _lodash2.default.forEach(this.report, function (check) {
        var parts = check.equation.split('=');

        var lhs = formatFunc(math.eval(parts[0], check.scope), _this2.panel.decimals, null);
        var rhs = formatFunc(math.eval(parts[1], check.scope), _this2.panel.decimals, null);

        check.equation = lhs + ' = ' + rhs;
      });
    }
  }, {
    key: 'onEditorSetFormat',
    value: function onEditorSetFormat(subitem) {
      this.panel.format = subitem.value;
      this.render();
    }
  }, {
    key: 'onEditorAddCheck',
    value: function onEditorAddCheck() {
      this.panel.checks.push({ equation: 'max(1,2,3) + mean(1,2,3) = gcd(1,2,3) * 2', name: 'Check Name' });
      this.render();
    }
  }, {
    key: 'onEditorRemoveCheck',
    value: function onEditorRemoveCheck(index) {
      this.panel.checks.splice(index, 1);
      this.render();
    }
  }, {
    key: 'onEditorAddThreshold',
    value: function onEditorAddThreshold() {
      this.panel.thresholds.push({ value: 0, color: this.panel.defaultColor });
      this.render();
    }
  }, {
    key: 'onEditorRemoveThreshold',
    value: function onEditorRemoveThreshold(index) {
      this.panel.thresholds.splice(index, 1);
      this.render();
    }
  }, {
    key: 'sortIcon',
    value: function sortIcon(columnName) {
      return this.sorter.icon(columnName);
    }
  }, {
    key: 'onColumnClick',
    value: function onColumnClick(columnName) {
      this.sorter.toggle(columnName);
      this.render();
    }
  }]);

  return ParityReportCtrl;
}(_sdk.MetricsPanelCtrl);

ParityReportCtrl.templateUrl = 'module.html';
exports.PanelCtrl = ParityReportCtrl;
