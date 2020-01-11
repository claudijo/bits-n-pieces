// This import (htmlToTextConverter) has issues with rollup, so this file should
// not be imported in the web app, until fixed...
const htmlToTextConverter = require('html-to-text');

const htmlToTextConverterOptions = {
  format: {
    heading: function(elem, fn, options) {
      const h = fn(elem.children, options);
      return `**  ${h.toUpperCase()}\n` +
        '------------------------------------------------------------\n';
    }
  }
};

function htmlToText(html) {
  // return html;
  return htmlToTextConverter.fromString(html, htmlToTextConverterOptions);
}

module.exports = {
  htmlToText,
};