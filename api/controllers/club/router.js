import express from "express";
import { validate, validator } from "../../middleware/validate.js";
import { login } from "./login.js";


export default express
  .Router()
  .post("/login", validate, validator, login);
  // .post("/schedule", schedule);
