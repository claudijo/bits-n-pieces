// This import (htmlToTextConverter) has issues with rollup, so this file should
// not be imported in the web app, until fixed...
const htmlToTextConverter = require('html-to-text');

const htmlToTextConverterOptions = {
  format: {
    heading(elem, fn, options) {
      const h = fn(elem.children, options);
      return `**  ${h.toUpperCase()}\n`
        + '------------------------------------------------------------\n';
    },
  },
};

// eslint-disable-next-line import/prefer-default-export
export function htmlToText(html) {
  return htmlToTextConverter.fromString(html, htmlToTextConverterOptions);
}
