const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
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
      type: String,
      required: true,
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
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
