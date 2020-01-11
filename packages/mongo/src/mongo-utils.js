function dateFromMongoId(_id) {
  const timestamp = _id.toString().substring(0, 8);
  const date = new Date(parseInt(timestamp, 16) * 1000);

  return date;
}

module.exports = {
  dateFromMongoId,
};