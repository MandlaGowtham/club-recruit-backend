import { otpGenerator, sendEmail } from "../../../utils/email.js";
import { sendError } from "../../../utils/notify.js";
import Freshers from "../../../models/freshers.js";
import VerifyOTP from "../../../models/verifyOTP.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log("server signup: ", email);

    let isEmailFound = await Freshers.findOne({ email });

    if (isEmailFound && isEmailFound.isVerified === false) {
      await Freshers.findByIdAndDelete(isEmailFound._id);

      let otpToken = await VerifyOTP.findOne({ email });
      if (!otpToken) return sendError(res, "Something went wrong. Register again!");
      await VerifyOTP.findByIdAndDelete(otpToken._id);
    }
    if (isEmailFound  && isEmailFound.isVerified === true) {
      return sendError(res, "Already Signed Up");
    }
    var newFresher = new Freshers({
      name,
      email,
      password,
    });
    const createdOTP = otpGenerator();
    const newOTP = new VerifyOTP({
      email,
      OTP: createdOTP,
    });

    await newOTP.save();
    await newFresher.save();

    console.log("newFresher.email : ", newFresher.email);
    sendEmail(newFresher.email, createdOTP);

    res.json({ fresherId: newFresher._id, message: "OTP sent to email" });
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
export const verify = async (req, res) => {
  try {
    const { email, OTP } = req.body;

    console.log("server verify: ", email);

    const fresher = await Freshers.findOne({ email });
    if (!fresher) return sendError(res, "Please signup again");

    const currObject = await VerifyOTP.findOne({ email });
    if (!currObject)
      return sendError(res, "OTP expired, Please Signup again!!");

    const isMatched = await currObject.compareToken(OTP);
    if (!isMatched) return sendError(res, "Please enter valid OTP!!");

    fresher.isVerified = true;

    await VerifyOTP.findByIdAndDelete(currObject._id);
    await fresher.save();

    res.json({ success: true, message: "Signed successfully, Please login" });
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
};
