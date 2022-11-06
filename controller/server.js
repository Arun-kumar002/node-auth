const express = require("express");
const { connect } = require("mongoose");
const flash = require("connect-flash");
const fileupload=require("express-fileupload")
const session = require("express-session");
const { engine } = require("express-handlebars");0
const {
  PORT,
  MONGODB_URL,
  MONGODB_CLOUD_URL,
  NODE_ENV, 
} = require("./config/index");
const handlebars = require("handlebars");
const productsRoute = require("./routes/products");

let app = express(); // Top level function.
app.use(fileupload({
  useTempFiles:true
}))

// Middleware block starts here
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Serving satatic files
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
// Middleware block ends here

// Basic home routes starts here
app.get("/", (req, res) => {
  res.render("home");
});
// Basic home routes ends here

// mount routes
app.use("/products", productsRoute);

//! starting server
let startServer = async () => {
  try {
    //? connect Database
    if (process.env.NODE_ENV === "development") {
      await connect(MONGODB_URL);
      console.log("Local mongodb connected");
    }
    if (process.env.NODE_ENV === "production") {
      await connect(MONGODB_CLOUD_URL);
      console.log("cloud database connected");
    }
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`server is listening on ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();
