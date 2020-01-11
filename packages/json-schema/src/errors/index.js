export function sanitizeErrors(prefix, errors) {
  return errors.map(error => {
    error.field = error.field.replace('data', prefix);
    return error;
  });
}

export function errorDetails(field, message) {
  return { field, message };
}
