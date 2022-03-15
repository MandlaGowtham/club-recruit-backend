import Clubs from "../../../models/clubs.js";
import { jwtTokenGenerator } from "../../../utils/jwt.js";
import { sendError } from "../../../utils/notify.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let currClub = await Clubs.findOne({ email });
    if (!currClub) {
      return sendError(res, "Incorrect email or password!");
    }

    // bcrypt.compareSync(password, currFresher.password)
    let isMatched = await currClub.comparePassword(password);
    if (!isMatched) {
      sendError(res, "Incorrect email or password!");
    }

    const jwtToken = jwtTokenGenerator(email, currClub._id);

    res.json({
      success: true,
      jwtToken,
    });
  } catch (error) {
    console.log(error.message);
    sendError(res, "Something went wrong with the server!");
  }
};
