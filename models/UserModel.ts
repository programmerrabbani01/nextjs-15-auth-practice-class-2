import mongoose from "mongoose";

// create user schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
    inActive: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export user schema

export default mongoose.models.User || mongoose.model("User", userSchema);
