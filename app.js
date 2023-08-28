import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import { errors } from "celebrate";
import router from "./routes/index.js";
import { requestLogger, errorLogger } from "./middlewares/logger.js";
import limiter from "./utils/limiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import { DB_HOST } from "./utils/config.js";

const { PORT = 3002 } = process.env;

const app = express();

mongoose.connect(`mongodb://${DB_HOST}`).catch((err) => {
  console.error(`Error on initial connection to MongoDB: ${err}`);
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(
    `Error after initial connection was established to MongoDB: ${err}`,
  );
});

app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(helmet());

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
