'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = exports.Builder = function () {
  function Builder(options) {
    _classCallCheck(this, Builder);

    this.options = options;
    this.scope = { 'first': function first(series) {
        return _lodash2.default.first(series);
      }, 'last': function last(series) {
        return _lodash2.default.last(series);
      } };
  }

  _createClass(Builder, [{
    key: 'call',
    value: function call() {
      var _this = this;

      var seriesList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var checks = arguments[1];

      this._targetToSeriesMapping(seriesList);
      var equations = _lodash2.default.map(checks, 'equation');

      return _lodash2.default.map(equations, function (eqn, index) {
        return _this._build(checks[index], eqn);
      });
    }
  }, {
    key: '_targetToSeriesMapping',
    value: function _targetToSeriesMapping(seriesList) {
      var _this2 = this;

      _lodash2.default.forEach(seriesList, function (series) {
        _this2.scope[series.target] = _this2._values(_this2._cleanup(series));
      });
    }
  }, {
    key: '_build',
    value: function _build(check, eqn) {
      return { name: check['name'], equation: eqn, scope: this.scope };
    }
  }, {
    key: '_cleanup',
    value: function _cleanup(series) {
      if (series !== undefined) {
        return _lodash2.default.filter(series.datapoints, function (point) {
          return point[0] != null;
        });
      }
    }
  }, {
    key: '_values',
    value: function _values(datapoints) {
      return _lodash2.default.map(datapoints, function (datapoint) {
        return datapoint[0];
      });
    }
  }]);

  return Builder;
}();
