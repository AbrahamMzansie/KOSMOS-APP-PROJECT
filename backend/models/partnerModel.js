const mongoose = require("mongoose");
const partnerSchema = mongoose.Schema({
  sellerID: {
    type: String,
    required: true,
  },
  buyerID: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
