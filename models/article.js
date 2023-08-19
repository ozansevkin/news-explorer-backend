import { Schema, model } from "mongoose";
import validator from "validator";
import { articleMessages as messages } from "../utils/constants.js";

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: messages.error.validator.url.link,
    },
  },
  image: {
    type: String,
    required: true,
    default: "https://placehold.co/600x400.png?text=NewsExplorer",
    validate: {
      validator: (v) => validator.isURL(v),
      message: messages.error.validator.url.image,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    select: false,
    ref: "User",
  },
});

const Article = model("Article", articleSchema);

export default Article;
