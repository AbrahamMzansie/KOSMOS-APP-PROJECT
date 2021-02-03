const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const streams = require("./data/streams");

const User = require("./models/userModels");
const Product = require("./models/productModels");
const Order = require("./models/orderModels");
const Stream = require("./models/streamModels");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    //  await Stream.deleteMany();
    //  await User.deleteMany();
    /*
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    const productSaved = await Product.insertMany(sampleProducts);
    */
    const user1 = await User.findById({ _id: "5fc7f2a4f9a5d535a079b8e4" });
    const user2 = await User.findById({ _id: "5fc9c2c875f2f81b2c840d4b" });
    const user3 = await User.findById({ _id: "5fc7a73d34f83f1018d5dd29" });
    const sampleStreams = streams.map((stream) => {
      return {
        ...stream,
        comments: [
          {user :user2, body: "Oracle software is the best" },
          { user: user1, body: "Khuluza nkomo is a developer" },
          { user: user3, body: "Please contact admin for issues" },
        ],
      };
    });
    const streamSaved = await Stream.insertMany(sampleStreams);

    // const createdUsers = await User.insertMany(users);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
