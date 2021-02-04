const Stream = require("../models/streamModels");
const User = require("../models/userModels");
const asyncHandler = require("express-async-handler");

//@desc : FETCH ALL STREAMS
//@route : GET /api/streams
//@access : public access
const getStreams = asyncHandler(async (req, res) => {
  const pageSize = 100;
  //const page = Number(req.query.pageNumber) || 1;
  const page = 1;

  const count = await Stream.countDocuments({});
  const streams = await Stream.find({})
    .populate("comments.user", "id name image nameHandler")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  for (const i in streams) {
    const name = streams[i].userHandle;
    const user = await User.findOne(
      { nameHandler: name },
      { image: 1, _id: 0 }
    );
    console.log(user);
    streams[i].image = user.image;
  }
  res.json({ streams, page, pages: Math.ceil(count / pageSize) });
});

//@desc : FETCH USER STREAMS
//@route : GET /api/streams/:userHandler/user
//@access : public access
const getUserStreams = asyncHandler(async (req, res) => {
  const pageSize = 100;
  //const page = Number(req.query.pageNumber) || 1;
  const page = 1;
  const count = await Stream.countDocuments({});
  const streams = await Stream.find({ userHandle: req.params.userHandler })
    .populate("comments.user", "id name image nameHandler")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  const selectedUser = await User.findOne({
    nameHandler: req.params.userHandler,
  });
  res.json({ streams, selectedUser, page, pages: Math.ceil(count / pageSize) });
});

//@desc : FETCH STREAM COMMENTS
//@route : GET /api/streams/:id/comments
//@access : public acces : private
const getStreamComments = asyncHandler(async (req, res) => {
  const scream = await Stream.findById(req.params.id);
  if (scream) {
    res.json(scream);
  } else {
    res.status(404).json({ message: "Scream not found" });
  }
});

//@desc : CREATE A COMMENT
//@route : GET /api/streams/:id/comment
//@access : private
const createComment = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const stream = await Stream.findById(req.params.id);
  stream.commentCount = stream.commentCount + 1;
  const comment = {
    body: body,
    user: req.user._id,
  };
  if (stream) {
    stream.comments.push(comment);
    const streamUpdate = await stream.save();
    const updatedStream = await Stream.findById(streamUpdate._id).populate(
      "comments.user",
      "id name image nameHandler"
    );

    //add notification
    const notification = {
      recipient: stream.userHandle,
      sender: comment.user,
      type: "Comment",
      screamId: stream._id,
      message: comment.body,
    };
    await User.updateOne(
      { nameHandler: stream.userHandle },
      { $push: { notifications: notification } }
    );
    res.json({ updatedStream });
  } else {
    res.status(404);
    throw new Error("Scream not found");
  }
});

//@desc : LIKE A STREAM
//@route : PUT /api/streams/:id/like
//@access : private
const likeStream = asyncHandler(async (req, res) => {
  const stream = await Stream.findById(req.params.id);
  const incrementLikes = stream.likesCount + 1;
  if (stream) {
    await Stream.updateOne(
      { _id: stream._id },
      { $set: { likesCount: incrementLikes } }
    );
    const updatedStream = await Stream.findById(req.params.id).populate(
      "comments.user",
      "id name image nameHandler"
    );
    const user = await User.findById(req.user._id);
    if (user) {
      const like = {
        userHandler: user.nameHandler,
        streamId: stream._id,
      };
      await User.updateOne({ _id: user._id }, { $addToSet: { likes: like } });
      const updatedUser = await User.findById(user._id);

      //add notification
      const notification = {
        recipient: stream.userHandle,
        sender: user._id,
        type: "like",
        screamId: stream._id,
        message: "like your post",
      };
      await User.updateOne(
        { nameHandler: stream.userHandle },
        { $push: { notifications: notification } }
      );

      res.json({ updatedStream, updatedUser });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("Scream not found");
  }
});

//@desc : UNLIKE A STREAM
//@route : PUT /api/streams/:id/unlike
//@access : private
const unlikeStream = asyncHandler(async (req, res) => {
  const stream = await Stream.findById(req.params.id);
  const unLikes = stream.likesCount - 1;
  if (stream) {
    await Stream.updateOne(
      { _id: stream._id },
      { $set: { likesCount: unLikes } }
    );
    const updatedStream = await Stream.findById(req.params.id).populate(
      "comments.user",
      "id name image nameHandler"
    );
    const user = await User.findById(req.user._id);
    if (user) {
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { likes: { streamId: stream._id } } },
        { safe: true, upsert: true, useFindAndModify: false }
      );

      //add notification
      const notification = {
        recipient: stream.userHandle,
        sender: user._id,
        type: "unlike",
        screamId: stream._id,
        message: "unlike your post",
      };
      await User.updateOne(
        { nameHandler: stream.userHandle },
        { $push: { notifications: notification } }
      );

      const updatedUser = await User.findById(user._id);
      res.json({ updatedStream, updatedUser });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("Scream not found");
  }
});

//@desc : CREATE A SCREAM
//@route : PUT /api/streams/
//@access : private
const createStream = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const user = await User.findById(req.user._id);
  const stream = new Stream({
    body: body,
    userHandle: user.nameHandler,
    image: user.image,
  });
  const createdStream = await stream.save();
  res.status(201).json(createdStream);
});

//@desc : DELETE A STREAM
//@route : DELETE /api/stream/:id
//@access : private
const deleteStream = asyncHandler(async (req, res) => {
  const stream = await Stream.findById(req.params.id);
  if (stream) {
    await stream.remove();
    res.json({ message: "Scream removed" });
  } else {
    res.status(404);
    throw new Error("Scream not found");
  }
});

//@desc : DELETE A COMMENT
//@route : DELETE /api/comment/delete
//@access : private
const deleteComment = asyncHandler(async (req, res) => {
  const stream = await Stream.findById(req.query.streamID);
  if (stream) {
    const decrementComment = stream.commentCount - 1;
    await Stream.updateOne(
      { _id: req.query.streamID },
      { $set: { commentCount: decrementComment } }
    );
    await Stream.update(
      { _id: req.query.streamID },
      { $pull: { comments: { _id: req.query.commentID } } }
    );
    res.json({ message: "message deleted successful" });
  } else {
    res.status(404);
    throw new Error("Scream not found");
  }
});

//@desc : FETCH STREAM BY ID
//@route : GET /api/streams/:id
//@access : public acces : private
const getStreamById = asyncHandler(async (req, res) => {
  const scream = await Stream.findById(req.params.id);
  if (scream) {
    res.json(scream);
  } else {
    res.status(404).json({ message: "Scream not found" });
  }
});

//@desc : CREATE A PRODUCT
//@route : PUT /api/products/
//@access : private/admin

/*
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
*/
module.exports = {
  /*
  getProducts: getProducts,
  getProductById: getProductById,
  deleteProduct: deleteProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  createProductReviews: createProductReviews,
  getTopRatedProducts: getTopRatedProducts,
  */
  getStreams: getStreams,
  getUserStreams: getUserStreams,
  likeStream: likeStream,
  unlikeStream: unlikeStream,
  deleteStream: deleteStream,
  createStream: createStream,
  getStreamById: getStreamById,
  getStreamComments: getStreamComments,
  createComment: createComment,
  deleteComment: deleteComment,
};
