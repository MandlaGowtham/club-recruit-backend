import fresherRouter from "./api/controllers/freshers/router.js";
import clubRouter from "./api/controllers/club/router.js"

export default function routes(app) {
  app.use("/fresher", fresherRouter);
  app.use("/club", clubRouter);
}