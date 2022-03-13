import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import routes from "./routes.js"

dotenv.config();

const PORT = process.env.PORT || 8080;
const mongodb_url = "mongodb+srv://gowtham:RW2UIq66Tx8xdjXV@cluster0.5uw4z.mongodb.net/club-recrit?retryWrites=true&w=majority";

mongoose
  .connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongodb");

    const app = express();
    app.use(express.json());
    app.use(cors({ origin: true }));
    app.use(express.urlencoded({ extended: true }));

    routes(app);

    app.listen(PORT, () => {
      console.log(`Server Running on Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
