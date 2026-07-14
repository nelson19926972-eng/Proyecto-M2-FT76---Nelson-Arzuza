const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error('[ERROR]', {
    method: req.method,
    url: req.originalUrl || req.url,
    message: err.message,
    stack: err.stack
  });

  // Errores de sintaxis al interpretar JSON enviado por el cliente.
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 400,
      message: 'El cuerpo de la solicitud contiene JSON invÃ¡lido'
    });
  }

  const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const message = status >= 500
    ? 'Error interno del servidor'
    : (err.message || 'OcurriÃ³ un error al procesar la solicitud');

  return res.status(status).json({ status, message });
};

module.exports = { errorHandler };
