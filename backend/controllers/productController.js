const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");

//@desc : FETCH ALL PRODUCTS
//@route : GET /api/products
//@access : public access
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //  throw new Error("The system failed to fetch products");
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc : FETCH PRODUCT BY ID
//@route : GET /api/products/:id
//@access : public access
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    //  throw new Error("The system failed to fetch products");
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

//@desc : DELETE A PRODUCT
//@route : DELETE /api/products/:id
//@access : private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc : CREATE A PRODUCT
//@route : PUT /api/products/
//@access : private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0.0,
    description: "Sample Description",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 1.0,
    user: req.user._id,
    image: "/images/body-lotion.jpeg",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc : UPDATE A PRODUCT
//@route : PUT /api/products/
//@access : private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc : CREATE A NEW REVIEW
//@route : POST /api/products/:id/review
//@access : private
const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreayReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreayReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc : GET TOP RATED PRODUCTS
//@route :GET /api/products/top
//@access : public
const getTopRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(10);
  res.json(products);
});
module.exports = {
  getProducts: getProducts,
  getProductById: getProductById,
  deleteProduct: deleteProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  createProductReviews: createProductReviews,
  getTopRatedProducts: getTopRatedProducts,
};
