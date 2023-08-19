import Article from "../models/article.js";
import ForbiddenError from "../errors/Forbidden.js";
import NotFoundError from "../errors/NotFound.js";
import BadRequestError from "../errors/BadRequest.js";
import { articleMessages as messages } from "../utils/constants.js";

export const getArticles = (req, res, next) => {
  const { _id: owner } = req.user;

  Article.find({ owner })
    .then((articles) => {
      res.send({ articles });
    })
    .catch(next);
};

export const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const { _id: owner } = req.user;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.status(201).send({ article }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(messages.error.badRequest));
      } else {
        next(err);
      }
    });
};

export const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { _id: userId } = req.user;

  Article.findById(articleId)
    .select("+owner")
    .orFail(new NotFoundError(messages.error.notFound))
    .then((article) => {
      const ownerId = String(article.owner);

      if (ownerId !== userId) {
        return next(new ForbiddenError(messages.error.forbidden));
      }

      return article
        .deleteOne()
        .then(() => res.send({ message: messages.response.deleted }));
    })
    .catch(next);
};
