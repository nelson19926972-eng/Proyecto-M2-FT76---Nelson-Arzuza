const validateIdParam = (paramName) => (req, res, next) => {

  const rawValue = req.params?.[paramName];

  if (rawValue === undefined || rawValue === null || rawValue === '') {
    return res.status(400).json({ status: 400, message: `El parámetro ${paramName} es obligatorio` });
  }

  if (!/^\d+$/.test(String(rawValue))) {
    return res.status(400).json({ status: 400, message: `El parámetro ${paramName} debe ser un id numérico` });
  }

  req.params[paramName] = Number(rawValue);
  next();
};

const validateDeleteIdParam = (req, res, next) => validateIdParam('id')(req, res, next);

module.exports = {
  validateIdParam,
  validateDeleteIdParam
};
