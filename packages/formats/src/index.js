module.exports = {
  mongoObjectId: /^[a-f\d]{24}$/i,
  shortId: /^[a-z0-9]{12}$/,
  ulid: /^(?:(?![ilouILOU])[a-zA-Z0-9]){26}$/,
  urlFriendlyString: /^[a-zA-Z0-9\._~-]*$/
};