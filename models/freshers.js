import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const FresherSchema = mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
  },
  password: {
      type: String,
      require :true,
  },
  name: {
    type: String,
  },
  isVerified: {
    type : Boolean,
    required : true,
    default : false,
  },
})

FresherSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  next();
})
FresherSchema.methods.comparePassword = async function(password) {
  const res = bcrypt.compareSync(password, this.password);
  return res;
};

export default mongoose.model('Freshers', FresherSchema);