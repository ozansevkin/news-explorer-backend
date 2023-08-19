import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import NotFoundError from "../errors/NotFound.js";
import ConflictError from "../errors/Conflict.js";
import BadRequestError from "../errors/BadRequest.js";
import { JWT_SECRET } from "../utils/config.js";
import { userMessages as messages } from "../utils/constants.js";

export const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .orFail(new NotFoundError(messages.error.notFound))
    .then((user) => res.send({ user }))
    .catch(next);
};

export const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        return next(new ConflictError(messages.error.conflict));
      }

      return bcrypt.hash(password, 10).then((hash) =>
        User.create({ name, email, password: hash }).then((user) => {
          const userData = user.toObject();
          delete userData.password;
          res.status(201).send({ user: userData });
        }),
      );
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(messages.error.badRequest));
      } else {
        next(err);
      }
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch(next);
};
