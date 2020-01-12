'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');

var HttpError = function (_Error) {
  (0, _inherits3.default)(HttpError, _Error);

  function HttpError(status) {
    var _ref;

    (0, _classCallCheck3.default)(this, HttpError);

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = HttpError.__proto__ || (0, _getPrototypeOf2.default)(HttpError)).call.apply(_ref, [this].concat(params)));
    // Pass remaining arguments (including vendor specific ones) to parent constructor


    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, HttpError);
    }

    _this.name = 'HttpError';
    _this.message = params[0] || http.STATUS_CODES[status];
    _this.status = status;
    return _this;
  }

  return HttpError;
}(Error);

exports.default = HttpError;
module.exports = exports.default;