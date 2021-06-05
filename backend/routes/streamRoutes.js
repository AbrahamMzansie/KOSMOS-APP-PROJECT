const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const streamControllers = require("../controllers/streamController");

router
  .route("/")
  .get(streamControllers.getStreams)
  .put(authMiddleware.protect, streamControllers.createStream);

  router
  .route("/:userHandler/user")
  .get(streamControllers.getUserStreams)
  
router
  .route("/:id")
  .delete(authMiddleware.protect, streamControllers.deleteStream)
  .get(authMiddleware.protect, streamControllers.getStreamById);
router
  .route("/:id/like")
  .get(authMiddleware.protect, streamControllers.likeStream);
router
  .route("/:id/unlike")
  .get(authMiddleware.protect, streamControllers.unlikeStream);
router
  .route("/:id/comment")
  .put(authMiddleware.protect, streamControllers.createComment);

router
  .route("/comment/delete")
  .delete(authMiddleware.protect, streamControllers.deleteComment);

module.exports = router;
