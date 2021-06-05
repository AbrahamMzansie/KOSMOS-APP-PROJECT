const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();
const User = require("../models/userModels");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/:id", upload.single("image"), async (req, res) => {
  const user = await User.findById(req.params.id);
  const url_ = `/${req.file.path}`;
  const url = url_.replace(/\\/g, "/");
  if (user) {
    await User.updateOne({ _id: req.params.id }, { $set: { image: url } });
  }
  res.send(`/${req.file.path.replace(/\\/g, "/")}`);
});
module.exports = router;
