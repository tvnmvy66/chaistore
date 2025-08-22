import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  name: { type: String },
  givenName: { type: String },
  familyName: { type: String },
  picture: { type: String },
  role: {type: String , default: "user"},
  shippingAddress: {
    address: { type: String, maxlength: 200 , default: ""},
    city: { type: String, maxlength: 100,  default: ""},
    postalCode: { type: String, maxlength: 6,  default: ""},  
    country: { type: String, maxlength: 100,  default: ""},
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
