import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const VerifyOTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    OTP:{
        type: String,
        required:true
    },
    createdAt:{
        type:Date,
        expires:180,
        default:Date.now()
    }
})

VerifyOTPSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.OTP, 12);
    this.OTP = hash;
    next();
})

VerifyOTPSchema.methods.compareToken = async function(token) {
    const res = bcrypt.compareSync(token, this.OTP);
    return res;
};

var VerifyOTP  = mongoose.model('VerifyOTP', VerifyOTPSchema);

export default VerifyOTP;