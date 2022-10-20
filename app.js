const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//Middlewarese

app.use(cors());
app.use(express.json());

// Schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name."],
      trim: true,
      unique: [true, "Name must be unique."],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide a valid price."],
      min: [0, "Price can't be negative."],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "Please provide a valid unit.",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Please provide a valid quantity."],
      min: [0, "Quantity can't be less than 0."],
      validate: {
        validator: function (value) {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return [false, "Quantity must be an integer."];
          }
        },
      },
      status: {
        type: String,
        required: true,
        enum: {
          values: ["in-stock", "out-af-stock", "discontinued"],
        },
      },
      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
      },
      categories: [
        {
          name: {
            type: String,
          },
          _id: mongoose.Schema.Types.ObjectId,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose middlewarese for saving data

// productSchema.pre("save", function (next) {
//   console.log("Before saving data.");

//   if (this.quantity == 0) {
//     this.status = "out-of-stock";
//     console.log(this.status);
//   }
//   next();
// });

// productSchema.post("save", function (doc, next) {
//   console.log("After saving data.");
//   next();
// });

// productSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.name}`);
// };

// Schema => Model => query
const Product = mongoose.model("Product", productSchema);

app.post("/api/v1/product", async (req, res, next) => {
  try {
    // Save and create
    // const result = await Product.create(req.body);

    const product = new Product(req.body);
    if(product.quantity == 0){
        product.status = 'out-of-stock';
    }
    const result = await product.save()

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// Get data
app.get("/api/v1/product", async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      status: "success",
      message: "Data fetched successfully.",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
