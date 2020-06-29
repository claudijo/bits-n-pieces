"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPrice = formatPrice;

function formatPriceAmount(amount) {
  var decimalCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var decimal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousands = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  decimalCount = Math.abs(decimalCount);
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  var negativeSign = amount < 0 ? '-' : '';
  var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
  var j = i.length > 3 ? i.length % 3 : 0;
  return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1".concat(thousands)) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
}

function formatPrice(price, currency) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en-US';

  if (locale !== 'en-US') {
    throw new Error("Invalid locale for price formatting: ".concat(locale));
  }

  var amount = formatPriceAmount(price, 0);

  switch (currency.toUpperCase()) {
    case 'ETB':
      return "ETB ".concat(amount);

    case 'USD':
      return "$".concat(amount);

    default:
      throw new Error("Invalid currency code: ".concat(currency));
  }
}