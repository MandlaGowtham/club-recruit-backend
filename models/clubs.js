import mongoose from 'mongoose';

const clubSchema = mongoose.Schema({
  email: {
      type: String,
      required: true,
      trim: true,
      unique: true
  },
  password: {
      type: String,
      require: true,
  },
  interviewsDate: Date,
  
}, {
  timestamps: true
})

var Clubs = mongoose.model('Clubs', clubSchema);

export default Clubs;