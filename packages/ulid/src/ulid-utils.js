const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function dateFromUlid(ulid) {
  let timestamp = 0;
  const decodedTimestamp = ulid.substring(0, 10).toUpperCase();

  for (let i = 0; i < decodedTimestamp.length; i++) {
    const char = decodedTimestamp.charAt(i);
    const multiplier = alphabet.indexOf(char);
    const exponent = (9 - i);

    timestamp += (Math.pow(32, exponent)) * multiplier;
  }

  return new Date(timestamp);
}