'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MongoClient = require('mongodb').MongoClient;
var EventEmitter = require('events');

var MongoWrapper = function (_EventEmitter) {
  _inherits(MongoWrapper, _EventEmitter);

  function MongoWrapper(name) {
    _classCallCheck(this, MongoWrapper);

    var _this = _possibleConstructorReturn(this, (MongoWrapper.__proto__ || Object.getPrototypeOf(MongoWrapper)).call(this));

    _this.name = name;

    _this.db = null;
    _this.client = null;
    _this.url = '';
    return _this;
  }

  _createClass(MongoWrapper, [{
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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