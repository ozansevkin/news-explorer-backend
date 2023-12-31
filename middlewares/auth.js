import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config.js";
import UnauthorizedError from "../errors/Unauthorized.js";
import { authErrorMessage } from "../utils/constants.js";

const auth = (req, res, next) => {
  try {
    const authorization = req.get("authorization");

    if (!authorization) {
      throw new UnauthorizedError(authErrorMessage);
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SECRET);

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

export default auth;
