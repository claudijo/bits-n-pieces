'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlToText = htmlToText;
// This import (htmlToTextConverter) has issues with rollup, so this file should
// not be imported in the web app, until fixed...
var htmlToTextConverter = require('html-to-text');

var htmlToTextConverterOptions = {
  format: {
    heading: function heading(elem, fn, options) {
      var h = fn(elem.children, options);
      return '**  ' + h.toUpperCase() + '\n' + '------------------------------------------------------------\n';
    }
  }
};

function htmlToText(html) {
  return htmlToTextConverter.fromString(html, htmlToTextConverterOptions);
}