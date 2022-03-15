import Freshers from "../../../models/freshers.js";
import { jwtTokenGenerator } from "../../../utils/jwt.js";
import { sendError } from "../../../utils/notify.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let currFresher = await Freshers.findOne({ email });
    if (!currFresher) {
      return sendError(res, "Incorrect email or password!");
    }
    if (currFresher.isVerified == false) {
      try {
        await Freshers.findByIdAndDelete(currFresher._id);
      } catch (error) {
        return sendError(res, "Incorrect email or password!");
      }
    }
    
    // bcrypt.compareSync(password, currFresher.password)
    let isMatched = await currFresher.comparePassword(password);
    if (!isMatched) sendError(res, "Incorrect email or password!");

    const jwtToken = jwtTokenGenerator(email, currFresher._id);

    res.json({
      success: true,
      jwtToken,
    });
  } catch (error) {
    console.log(error.message);
    sendError(res, "Something went wrong with the server!");
  }
};
