'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpError = require('./http-error');

var HttpJsonError = function (_HttpError) {
  (0, _inherits3.default)(HttpJsonError, _HttpError);

  function HttpJsonError(status, errors) {
    var _ref;

    (0, _classCallCheck3.default)(this, HttpJsonError);

    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = HttpJsonError.__proto__ || (0, _getPrototypeOf2.default)(HttpJsonError)).call.apply(_ref, [this, status, (0, _stringify2.default)(errors)].concat(params)));
    // Pass remaining arguments (including vendor specific ones) to parent constructor


    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, HttpJsonError);
    }

    _this.name = 'HttpJsonError';
    _this.errors = errors;
    return _this;
  }

  return HttpJsonError;
}(HttpError);

exports.default = HttpJsonError;
module.exports = exports.default;