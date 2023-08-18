const JWT_SECRET =
  process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-secret";

export default JWT_SECRET;
