import { defaultErrorMessage } from "../utils/constants";

const errorHandler = (err, req, res, next) => {
  // Log the error
  // console.error(err);

  if (res.headersSent) return next(err);

  const { statusCode = 500 } = err;
  let { message } = err;

  if (statusCode === 500) {
    message = defaultErrorMessage;
  }

  return res.status(statusCode).send({ message });
};

export default errorHandler;
