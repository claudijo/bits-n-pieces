"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlToText = htmlToText;

const htmlToTextConverter = require('html-to-text');

const htmlToTextConverterOptions = {
  format: {
    heading(elem, fn, options) {
      const h = fn(elem.children, options);
      return `**  ${h.toUpperCase()}\n` + '------------------------------------------------------------\n';
    }

  }
};

function htmlToText(html) {
  return htmlToTextConverter.fromString(html, htmlToTextConverterOptions);
}