import { Joi, celebrate } from "celebrate";
import validator from "validator";

// Custom validation function
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

export const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().empty("").default("User").min(2).max(30).messages({
      "string.min": "The minimum length of the `name` field is 2",
      "string.max": "The maximum length of the `name` field is 30",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field can not be empty",
      "string.email": "The `email` field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The `password` field can not be empty",
    }),
  }),
});

export const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The `email` field can not be empty",
      "string.email": "The `email` field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The `password` field can not be empty",
    }),
  }),
});

export const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": "The `keyword` field can not be empty",
    }),
    title: Joi.string().required().messages({
      "string.empty": "The `title` field can not be empty",
    }),
    text: Joi.string().required().messages({
      "string.empty": "The `text` field can not be empty",
    }),
    date: Joi.string().required().isoDate().messages({
      "string.empty": "The `date` field can not be empty",
      "string.isoDate": "The `date` field must be a valid ISO 8601 date",
    }),
    source: Joi.string().required().messages({
      "string.empty": "The `source` field can not be empty",
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The `link` field can not be empty",
      "string.uri": "The `link` field must be a valid url",
    }),
    image: Joi.string()
      .empty("")
      .default("https://placehold.co/600x400.png?text=NewsExplorer")
      .custom(validateURL)
      .messages({
        "string.uri": "The `image` field must be a valid url",
      }),
  }),
});

export const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().hex().length(24).messages({
      "string.hex": "The `articleId` url parameter must be hexadecimal",
      "string.length":
        "The length of `articleId` url parameter must be 24 characters",
    }),
  }),
});
