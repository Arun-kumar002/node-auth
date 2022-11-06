const productSchema = require("../Model/ProductModel");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "doeflycdx",
  api_key: "794118991127553",
  api_secret: "hS9txmhnSCc3LDG0UJ6m6FSuPek"
})


// Creating a products

let GetProduct = async (req, res) => {
  res.render("products/create-products");
};

// Post Method
let CreateProduct = async (req, res, next) => {
  try {

    let { name, description, price, ratings, category, stock } = req.body;
    let images = req.files.images;
    console.log(req.files.images)
    cloudinary.uploader.upload(images.tempFilePath, { folder: "kart" }, function (err, result) {
      res.send({
        success: true,
        result
      })
      // console.log("Error: ",err);
      // console.log("Result: ",result);
    })
    await new productSchema({
      name,
      description,
      price,
      ratings,
      category,
      stock,
      images,
    }).save();
    // res.redirect("/products/get-products", 301, {});
    res.end("ok");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetProduct, CreateProduct };
