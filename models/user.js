import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import UnauthorizedError from "../errors/Unauthorized.js";
import { userMessages as messages } from "../utils/constants.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "User",
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: messages.error.validator.email,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    statics: {
      findByCredentials(email, password) {
        const error = new UnauthorizedError(messages.error.unauthorized);

        return this.findOne({ email })
          .select("+password")
          .orFail(error)
          .then((user) =>
            bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) return Promise.reject(error);

              return user;
            }),
          );
      },
    },
  },
);
const User = model("User", userSchema);

export default User;
