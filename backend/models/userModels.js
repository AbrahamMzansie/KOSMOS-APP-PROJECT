const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const likeSchema = mongoose.Schema(
  {
    userHandler: { type: String, reqired: true },
    streamId: { type: String, reqired: true },
  },
  { timestamps: true }
);

const notificationSchema = mongoose.Schema(
  {
    message : {
      type : String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
    recipient: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    read: {
      type: false,
      default: false,
    },
    screamId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Stream",
    },
  },
  {
    timestamps: true,
  }
);
const userSchema = mongoose.Schema(
  {
    notifications : [notificationSchema],
    likes: [likeSchema],
    nameHandler: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
