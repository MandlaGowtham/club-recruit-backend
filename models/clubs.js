import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ClubSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    interviewsDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

ClubSchema.methods.comparePassword = async function (password) {
  const res = bcrypt.compareSync(password, this.password);
  return res;
};

export default mongoose.model("Clubs", ClubSchema);
