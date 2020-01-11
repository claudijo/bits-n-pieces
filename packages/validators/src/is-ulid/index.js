const { ulid } = require('@claudijo/formats');

export default function(value) {
  ulid.test(value);
}