import jwt from "jsonwebtoken";

export const jwtTokenGenerator = (email, id) => {
  let data = {
    time: Date.now(),
    id,
    email,
  };
  const JWTToken = jwt.sign(data, process.env.jwtSecretKey, {
    expiresIn: 2 * 60,

    // 2*60     => 2 minutes 60 seconds
    // 24*60*60 => 24 hours 60 minutes 60 seconds
    // "1h"     => 1 hour
    // 120      => 120ms
    // 120s     => 120 seconds
  });
  return JWTToken;
};
