import express from "express";
import { signup, verify } from "./signup.js";
import { validate, validator } from "../../middleware/validate.js";
import { login } from "./login.js";

export default express
  .Router()
  .post("/signup", validate, validator, signup)
  .post("/verify", verify)
  .post("/login", login);
