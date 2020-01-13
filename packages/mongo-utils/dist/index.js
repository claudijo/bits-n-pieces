"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFromMongoId = dateFromMongoId;

// eslint-disable-next-line import/prefer-default-export
function dateFromMongoId(_id) {
  const timestamp = _id.toString().substring(0, 8);

  return new Date(parseInt(timestamp, 16) * 1000);
}