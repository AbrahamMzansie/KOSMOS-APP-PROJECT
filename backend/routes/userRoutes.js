const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const userControllers = require("../controllers/userController");

router.put(
  "/:id/connect",
  authMiddleware.protect,
  userControllers.connectWithAdminUser
);
router
  .route("/admin")
  .get(authMiddleware.protect, userControllers.getAdminUsersAndRelatedProducts);
router
  .route("/")
  .post(userControllers.registerUser)
  .get(authMiddleware.protect, authMiddleware.admin, userControllers.getUsers);
router
  .route("/profile")
  .get(authMiddleware.protect, userControllers.getUserProfile)
  .put(authMiddleware.protect, userControllers.updateUserProfile);

router
  .route("/:id")
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    userControllers.deleteUser
  )
  .get(
    authMiddleware.protect,
    authMiddleware.admin,
    userControllers.getUserById
  )
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    userControllers.updateUser
  );
router.post("/login", userControllers.authUser);

module.exports = router;
