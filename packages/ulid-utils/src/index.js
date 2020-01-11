const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

// eslint-disable-next-line import/prefer-default-export
export function dateFromUlid(ulid) {
  let timestamp = 0;
  const decodedTimestamp = ulid.substring(0, 10).toUpperCase();

  for (let i = 0; i < decodedTimestamp.length; i += 1) {
    const char = decodedTimestamp.charAt(i);
    const multiplier = alphabet.indexOf(char);
    const exponent = (9 - i);

    timestamp += (32 ** exponent) * multiplier;
  }

  return new Date(timestamp);
}
