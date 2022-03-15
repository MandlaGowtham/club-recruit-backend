import express from "express";
import { login } from "./login.js";


export default express
  .Router()
  .post("/login", login);
