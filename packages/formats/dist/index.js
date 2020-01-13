"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  mongoObjectId: /^[a-f\d]{24}$/i,
  shortId: /^[a-z0-9]{12}$/,
  ulid: /^(?:(?![ilouILOU])[a-zA-Z0-9]){26}$/,
  urlFriendlyString: /^[a-zA-Z0-9._~-]*$/
};
exports.default = _default;
module.exports = exports.default;