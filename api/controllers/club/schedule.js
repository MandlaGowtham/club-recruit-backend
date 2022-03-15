import { sendError } from "../../../utils/notify";

export const schedule = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error.message);
    sendError(res, "Something went Wrong!")
  }
}