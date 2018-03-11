'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sorter = exports.Sorter = function () {
  function Sorter(options) {
    _classCallCheck(this, Sorter);

    this.options = options;
  }

  _createClass(Sorter, [{
    key: 'sort',
    value: function sort(rows) {
      var _this = this;

      return rows.concat().sort(function (rowA, rowB) {
        var value = _this._sortValueFor(rowA, rowB);
        return _this.options.sortMultiplier * value;
      });
    }
  }, {
    key: 'toggle',
    value: function toggle(columnName) {
      var multiplier = this.options.sortMultiplier;
      var column = this.options.sortColumn;

      if (column !== columnName) {
        this.options.sortColumn = columnName;
      } else {
        this.options.sortMultiplier = multiplier * -1;
      }
    }
  }, {
    key: 'icon',
    value: function icon(columnName) {
      if (this.options.sortColumn !== columnName) {
        return null;
      }

      if (this.options.sortMultiplier === 1) {
        return 'fa fa-sort-asc';
      } else {
        return 'fa fa-sort-desc';
      }
    }
  }, {
    key: '_sortValueFor',
    value: function _sortValueFor(rowA, rowB) {
      var column = this.options.sortColumn;
      if (column === 'name') {
        return rowA.name.localeCompare(rowB.name);
      }if (column === 'difference') {
        return rowA.difference - rowB.difference;
      } else {
        return 0;
      }
    }
  }]);

  return Sorter;
}();
