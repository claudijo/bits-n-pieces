export function newLinesToParagraph(text, attributes = {}, quote = '\'') {
  let attr = Object.entries(attributes)
    .map(([key, value]) => `${key === 'className' ? 'class' : key}=${quote + value + quote}`)
    .join(' ');

  if (attr) {
    attr = ` ${attr}`;
  }

  return `<p${attr}>${text.replace(/\r?\n([ \t]*\r?\n)+/g, `</p><p${attr}>`).replace(/\r?\n/g, '<br />')}</p>`;
}

export function newLineToHtmlBreak(text = '') {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
}
