const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    userHandler: { type: String, reqired: true },
    streamId: { type: String, reqired: true },
  },
  { timestamps: true }
);
const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    body: { type: String, required: true },
    commentLoading: {
      type: String,
      default: "",
    },
    commentError: { type: String, default: "" },
  },

  { timestamps: true }
);
const streamSchema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,

      default: false,
    },
    loadingLike: {
      type: Boolean,
      default: false,
    },
    errorLike: {
      type: String,
    },
    errorDelete: {
      type: String,
    },
    userHandle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    likes: [likeSchema],
    comments: [commentSchema],
    commentCount: {
      type: Number,
      default: 0,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Stream = mongoose.model("Stream", streamSchema);
module.exports = Stream;
