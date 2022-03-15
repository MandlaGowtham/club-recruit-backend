import { jwtTokenGenerator } from "../../../utils/jwt.js";
import { sendError } from "../../../utils/notify.js";
import Freshers from "../../../models/freshers.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let currFresher = await Freshers.findOne({ email });
    if (!currFresher) {
      return sendError(res, "Email not found");
    }
    if (currFresher.isVerified == false) {
      try {
        await Freshers.findByIdAndDelete(currFresher._id);
      } catch (error) {
        return sendError(res, "Email not found");
      }
    }
    
    // bcrypt.compareSync(password, currFresher.password)
    let isMatched = await currFresher.compareToken(password);
    if (!isMatched) sendError(res, "Mismatched Roll Number or Password!");

    const jwtToken = jwtTokenGenerator(currFresher._id);

    res.json({
      success: true,
      userId: currFresher._id,
      jwtToken,
    });
  } catch (error) {
    console.log(error.message);
    sendError(res, "Server, Something went Wrong!");
  }
};
