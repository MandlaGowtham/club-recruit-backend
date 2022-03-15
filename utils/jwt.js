import jwt from "jsonwebtoken"

export const jwtTokenGenerator = (id) => {
  let jwtSecretKey = process.env.jwtSecretKey;
  let data = {
    time: Date.now(),
    id: id
  }
  const token = jwt.sign(data, jwtSecretKey);
  return token;
}