const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const productControllers = require("../controllers/productController");

router.get("/top" , productControllers.getTopRatedProducts);
router
  .route("/")
  .get(productControllers.getProducts)
  .post(
    authMiddleware.protect,
    authMiddleware.admin,
    productControllers.createProduct
  );
router
  .route("/:id")
  .get(productControllers.getProductById)
  .delete(
    authMiddleware.protect,
    authMiddleware.admin,
    productControllers.deleteProduct
  )
  .put(
    authMiddleware.protect,
    authMiddleware.admin,
    productControllers.updateProduct
  );
router.route("/:id/reviews").post(authMiddleware.protect, productControllers.createProductReviews);

module.exports = router;
