import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: [String],
    required: true,
    default: ["dev"],
    enum: ["dev", "user", "admin"]
  }
});

export default mongoose.model("user", UserSchema);
