import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import UnauthorizedError from "../errors/Unauthorized.js";

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
        message: "You must enter a valid email",
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
        const error = new UnauthorizedError(
          "Entered email and/or password is wrong",
        );

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
