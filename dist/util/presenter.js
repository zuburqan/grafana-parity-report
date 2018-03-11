'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Presenter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _math = require('../external/math.min');

var math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Presenter = exports.Presenter = function () {
  function Presenter(options) {
    _classCallCheck(this, Presenter);

    this.options = options;
  }

  _createClass(Presenter, [{
    key: 'call',
    value: function call(report) {
      var _this = this;

      _lodash2.default.forEach(report, function (check) {
        return _this._setDiff(check);
      });
      _lodash2.default.forEach(report, function (check) {
        return _this._setColor(check);
      });
      return report;
    }
  }, {
    key: '_setDiff',
    value: function _setDiff(check) {
      var parts = check.equation.split('=');

      var lhs = math.eval(parts[0], check.scope);
      var rhs = math.eval(parts[1], check.scope);

      var larger = _lodash2.default.max([lhs, rhs]);
      if (larger === 0) {
        return 0;
      }

      var difference = Math.abs(lhs - rhs) / larger * 100;
      check.difference = parseFloat(this._precisionDiff(difference));
    }
  }, {
    key: '_setColor',
    value: function _setColor(check) {
      var thresholds = this.options.thresholds.concat().sort(function (a, b) {
        return b.value - a.value;
      });
      var threshold = _lodash2.default.find(thresholds, function (threshold) {
        return check.difference >= threshold.value;
      });
      check.color = this._determineColorWith(threshold);
    }
  }, {
    key: '_precisionDiff',
    value: function _precisionDiff(difference) {
      return difference.toFixed(this.options.decimals);
    }
  }, {
    key: '_determineColorWith',
    value: function _determineColorWith(threshold) {
      return threshold ? 'background-color:' + threshold.color : 'background-color:' + this.options.defaultColor;
    }
  }]);

  return Presenter;
}();
