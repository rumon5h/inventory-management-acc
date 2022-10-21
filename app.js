const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//Middlewarese

app.use(cors());
app.use(express.json());

const productRoute = require("./routes/product.route")
app.use("/api/v1/product", productRoute);


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('*', (req, res) => {
  res.send("Route not found!");
})
module.exports = app;
