const errorHandler = (err, req, res, next) => {
  // Log the error
  // console.error(err);

  if (res.headersSent) return next(err);

  const { statusCode = 500 } = err;
  let { message } = err;

  if (statusCode === 500) {
    message = "An error occurred on the server";
  }

  return res.status(statusCode).send({ message });
};

export default errorHandler;
