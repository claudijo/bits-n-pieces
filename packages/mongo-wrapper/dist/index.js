'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var EventEmitter = require('events');

var MongoWrapper = function (_EventEmitter) {
  (0, _inherits3.default)(MongoWrapper, _EventEmitter);

  function MongoWrapper(name) {
    (0, _classCallCheck3.default)(this, MongoWrapper);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MongoWrapper.__proto__ || (0, _getPrototypeOf2.default)(MongoWrapper)).call(this));

    _this.name = name;

    _this.db = null;
    _this.client = null;
    _this.url = '';
    return _this;
  }

  (0, _createClass3.default)(MongoWrapper, [{
    key: 'connect',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.url = url;

                _context.next = 3;
                return MongoClient.connect(url, {
                  useUnifiedTopology: true,
                  useNewUrlParser: true
                }, function (error, client) {
                  if (error) {
                    _this2.emit('error', error);
                    return;
                  }

                  _this2.client = client;
                  _this2.db = _this2.client.db(_this2.name);
                  _this2.emit('connected');
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function connect(_x) {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'disconnect',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.client) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('Database connection missing');

              case 2:
                _context2.next = 4;
                return this.client.close();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function disconnect() {
        return _ref2.apply(this, arguments);
      }

      return disconnect;
    }()
  }]);
  return MongoWrapper;
}(EventEmitter);

exports.default = MongoWrapper;
module.exports = exports.default;