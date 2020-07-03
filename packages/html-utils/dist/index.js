"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenizeBreaks = tokenizeBreaks;
exports.tokenizeParagraphs = tokenizeParagraphs;
exports.newLinesToParagraph = newLinesToParagraph;
exports.newLineToHtmlBreak = newLineToHtmlBreak;

function tokenizeBreaks(text = '') {
  return text.split(/(?:\r?\n)/g);
}

function tokenizeParagraphs(text = '') {
  return text.split(/(?:\r?\n){2,}/g);
}

function newLinesToParagraph(text, attributes = {}, quote = '\'') {
  let attr = Object.entries(attributes).map(([key, value]) => `${key === 'className' ? 'class' : key}=${quote + value + quote}`).join(' ');

  if (attr) {
    attr = ` ${attr}`;
  }

  return tokenizeParagraphs(text).map(paragraph => `<p${attr}>${paragraph}</p>`).join('');
}

function newLineToHtmlBreak(text = '') {
  return tokenizeBreaks(text).join('<br/>');
}