'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpError = require('./http-error');

var HttpJsonError = function (_HttpError) {
  _inherits(HttpJsonError, _HttpError);

  function HttpJsonError(status, errors) {
    var _ref;

    _classCallCheck(this, HttpJsonError);

    for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    var _this = _possibleConstructorReturn(this, (_ref = HttpJsonError.__proto__ || Object.getPrototypeOf(HttpJsonError)).call.apply(_ref, [this, status, JSON.stringify(errors)].concat(params)));
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