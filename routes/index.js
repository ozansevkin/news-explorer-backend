import { Router } from "express";
import usersRouter from "./users.js";
import articlesRouter from "./articles.js";
import { createUser, login } from "../controllers/users.js";
import { validateUser, validateLogin } from "../middlewares/validation.js";
import auth from "../middlewares/auth.js";
import NotFoundError from "../errors/NotFound.js";

const router = Router();

router.use("/signup", validateUser, createUser);
router.use("/signin", validateLogin, login);

router.use(auth);
router.use("/users", usersRouter);
router.use("/articles", articlesRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found."));
});

export default router;
