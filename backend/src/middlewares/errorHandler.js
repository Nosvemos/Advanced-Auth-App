const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    err.message = 'Duplicate field value entered.';
    err.statusCode = 400;
  }

  const statusCode = err.statusCode || 500;

  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  if (err.errors && Array.isArray(err.errors)) {
    response.errors = err.errors.map(e => ({
      field: e.param,
      message: e.msg,
    }));
  }

  res.status(statusCode).json(response);
};

export default errorHandler;