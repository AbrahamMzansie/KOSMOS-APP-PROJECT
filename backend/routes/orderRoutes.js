const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

router
  .route("/")
  .post(authMiddleware.protect, orderController.addOrderItems)
  .get(authMiddleware.protect, authMiddleware.admin, orderController.getOrders);
router
  .route("/myorders")
  .get(authMiddleware.protect, orderController.getUserOrders);
router.route("/:id").get(orderController.getOrderByID);
router
  .route("/:id/pay")
  .put(authMiddleware.protect, orderController.updateOrderToPaid);
router
  .route("/:id/deliver")
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    orderController.updateOrderToDelivered
  );

module.exports = router;
