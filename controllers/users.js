import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import NotFoundError from "../errors/NotFound.js";
import ConflictError from "../errors/Conflict.js";
import BadRequestError from "../errors/BadRequest.js";
import JWT_SECRET from "../utils/config.js";

export const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .orFail(new NotFoundError("No user found"))
    .then((user) => res.send({ user }))
    .catch(next);
};

export const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        return next(
          new ConflictError("Entered an email address already exists."),
        );
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
        next(new BadRequestError("Invalid user data sent to server."));
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
