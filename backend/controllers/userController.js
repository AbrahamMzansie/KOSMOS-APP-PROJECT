const User = require("../models/userModels");
const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");
const generateToken = require("../token/generateToken");

//@desc : auth user && login user
//@route : GET /api/users/login
//@access : public access
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nameHandler: user.nameHandler,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc : register a new user
//@route : POST /api/users
//@access : public access
const registerUser = asyncHandler(async (req, res) => {
  const { nameHandler, email, password } = req.body;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error(`User with email ${email} already exist`);
  } else {
    const user = await User.create({
      nameHandler: nameHandler,
      email: email,
      password: password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        nameHandler: user.nameHandler,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error(`Invalid data`);
    }
  }
});

//@desc : get user profile
//@route : GET /api/users/profile
//@access : private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
    //   {
    /*
      _id: user._id,
      nameHandler: user.nameHandler,
      email: user.email,
      isAdmin: user.isAdmin,
      image: user.image,
      website: user.website,
      bio: user.bio,
      location: user.location,
      */
    // });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : get all users
//@route : GET /api/users
//@access : Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc : get all Admin Users and Related Products
//@route : GET /api/users/:isAdmin
//@access : Private
const getAdminUsersAndRelatedProducts = asyncHandler(async (req, res) => {
  // _id: { $ne: req.user._id }
  const users = await User.find({ isAdmin: true });
  if (users) {
    await Promise.all(
      users.map(async (item) => {
        const product = await Product.find({ user: item._id });
        if (product.length !== 0) {
          const existProduct = item.products.find((i) => {
            return i._id == product._id;
          });
          if (!existProduct) {
            item.products.push(...product);
          }
        }
      })
    );
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No Admin users");
  }
});

//@desc : get user by id
//@route : GET /api/users/:id
//@access : Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : update user
//@route : PUT /api/users/:id
//@access : private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.nameHandler = req.body.nameHandler || user.nameHandler;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.image = req.body.image || user.image;
    user.website = req.body.website || user.website;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nameHandler: updatedUser.nameHandler,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      image: updatedUser.image,
      website: updatedUser.website,
      bio: updatedUser.bio,
      location: updatedUser.location,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : update user image
//@route : PUT /api/users/:id
//@access : private
const updateUserImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user._id = user._id;
    user.nameHandler = user.nameHandler;
    user.email = user.email;
    user.isAdmin = user.isAdmin;
    user.image = user.image;
    user.website = user.website;
    user.bio = user.bio;
    user.location = user.location;

    const updatedUser = await user.save();
    /*
    res.json({
      _id: updatedUser._id,
      nameHandler: updatedUser.nameHandler,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
    */
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc : delete a user
//@route : DELETE /api/users/:id
//@access : Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User was removed" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc : update user profile
//@route : PUT /api/users/profile
//@access : private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.nameHandler = req.body.nameHandler || user.nameHandler;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;
    user.website = req.body.website || user.website;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    user.likes = req.body.likes || user.likes;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nameHandler: updatedUser.nameHandler,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      image: updatedUser.image,
      website: updatedUser.website,
      bio: updatedUser.bio,
      location: updatedUser.location,
      likes: updatedUser.likes,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc : connect with admin user
//@route : PUT /api/users/:id/connect
//@access : private
const connectWithAdminUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const existPartner = user.partners.find((i) => {
      return i._id == req.body._id;
    });
    if (!existPartner) {
      user.partners.push({ ...req.body });
    }
    if (req.body.products) {
      req.body.products.map((product) => {
        const existProduct = user.products.find((i) => {
          return i._id == product._id;
        });
        if (!existProduct) {
          user.products.push({ ...product });
        }
      });
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nameHandler: updatedUser.nameHandler,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      partners: updatedUser.partners,
      products: updatedUser.products,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = {
  authUser: authUser,
  getUserProfile: getUserProfile,
  registerUser: registerUser,
  updateUserProfile: updateUserProfile,
  getUsers: getUsers,
  deleteUser: deleteUser,
  getUserById: getUserById,
  updateUser: updateUser,
  getAdminUsersAndRelatedProducts: getAdminUsersAndRelatedProducts,
  connectWithAdminUser,
};
