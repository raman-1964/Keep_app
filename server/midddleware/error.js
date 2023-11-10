const handleError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).send({ success: false, msg: err.message });
};

module.exports = handleError;
