"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFromMongoId = dateFromMongoId;
function dateFromMongoId(_id) {
  var timestamp = _id.toString().substring(0, 8);
  return new Date(parseInt(timestamp, 16) * 1000);
}