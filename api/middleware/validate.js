import { check, validationResult } from "express-validator";
import { sendError } from "../../utils/notify.js";

export const validate = [
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be minimum 8 characters long!"),
];

export const validator = (req, res, next) => {
  const errors = validationResult(req).array();
  if (!errors.length) return next();
  else sendError(res, errors[0].msg, 400);
};
