const { validateIdParam } = require('./get');

const validateDeleteIdParam = (req, res, next) => validateIdParam('id')(req, res, next);

module.exports = {
  validateDeleteIdParam
};
