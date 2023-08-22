export const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-secret";

export const DB_HOST =
  process.env.NODE_ENV === "production"
    ? process.env.DB_HOST
    : "127.0.0.1:27017/news-explorer_db";
