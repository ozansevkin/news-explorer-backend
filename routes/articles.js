import { Router } from "express";
import {
  getArticles,
  createArticle,
  deleteArticle,
} from "../controllers/articles.js";
import {
  validateArticle,
  validateArticleId,
} from "../middlewares/validation.js";

const router = Router();

router.get("/", getArticles);
router.post("/", validateArticle, createArticle);
router.delete("/:articleId", validateArticleId, deleteArticle);

export default router;
