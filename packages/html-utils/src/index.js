export function tokenizeBreaks(text = '') {
  return text.split(/(?:\r?\n)/g);
}

export function tokenizeParagraphs(text = '') {
  return text.split(/(?:\r?\n){2,}/g);
}

export function newLinesToParagraph(text, attributes = {}, quote = '\'') {
  let attr = Object.entries(attributes)
    .map(([key, value]) => `${key === 'className' ? 'class' : key}=${quote + value + quote}`)
    .join(' ');

  if (attr) {
    attr = ` ${attr}`;
  }

  return tokenizeParagraphs(text)
    .map((paragraph) => `<p${attr}>${paragraph}</p>`)
    .join('');
}

export function newLineToHtmlBreak(text = '') {
  return tokenizeBreaks(text).join('<br/>');
}
