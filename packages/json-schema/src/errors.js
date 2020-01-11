function sanitizeErrors(prefix, errors) {
  return errors.map(error => {
    error.field = error.field.replace('data', prefix);
    return error;
  });
}

function errorDetails(field, message) {
  return { field, message };
}

module.exports = {
  sanitizeErrors,
  errorDetails,
};