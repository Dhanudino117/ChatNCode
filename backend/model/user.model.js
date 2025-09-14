import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [10, "Email must be minimum 10 characters long"],
    maxLength: [30, "Email should not be maximum 30 characters"],
  },
  password: {
    type: String,
    select: false,
  },
});

// static method
userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// instance method
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// instance method
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const User = mongoose.model("user", userSchema);

export default User;
