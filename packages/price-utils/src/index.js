// See https://stackoverflow.com/a/149099/1390422
function formatPriceAmount(amount, decimalCount = 2, decimal = '.', thousands = ',') {
  // eslint-disable-next-line no-param-reassign
  decimalCount = Math.abs(decimalCount);

  // eslint-disable-next-line no-param-reassign, no-restricted-globals
  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

  const negativeSign = amount < 0 ? '-' : '';

  // eslint-disable-next-line no-param-reassign
  const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
  const j = (i.length > 3) ? i.length % 3 : 0;

  return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');
}

// Avoid using Intl since it causes errors in number of (mobile) browsers.
// eslint-disable-next-line import/prefer-default-export
export function formatPrice(price, currency, locale = 'en-US') {
  if (locale !== 'en-US') {
    throw new Error(`Invalid locale for price formatting: ${locale}`);
  }

  const amount = formatPriceAmount(price, 0);

  switch (currency.toUpperCase()) {
    case 'ETB':
      return `ETB ${amount}`;
    case 'USD':
      return `$${amount}`;
    default:
      throw new Error(`Invalid currency code: ${currency}`);
  }
}
