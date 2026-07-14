const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

const isValidEmail = (value) => (
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
);

const parsePositiveInteger = (value) => {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
};

module.exports = {
  isNonEmptyString,
  isValidEmail,
  parsePositiveInteger
};
