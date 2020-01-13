"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateFromUlid = dateFromUlid;
var alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // eslint-disable-next-line import/prefer-default-export

function dateFromUlid(ulid) {
  var timestamp = 0;
  var decodedTimestamp = ulid.substring(0, 10).toUpperCase();

  for (var i = 0; i < decodedTimestamp.length; i += 1) {
    var char = decodedTimestamp.charAt(i);
    var multiplier = alphabet.indexOf(char);
    var exponent = 9 - i;
    timestamp += Math.pow(32, exponent) * multiplier;
  }

  return new Date(timestamp);
}