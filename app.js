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
      minLength: [true, "Name must be at least  character"],
      maxLength: [true, "Name must be less than 100 characters"],
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
      min: [0, "Quantity can't be less than 1."],
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



// Schema => Model => query
const Product = mongoose.model("Product", productSchema);

app.post("/api/v1/product", async (req, res, next) => {
  try {
    // Save and create
    const result = await Product.create(req.body);

    // const product = new Product(req.body);
    // if(product.quantity == 0){
    //     product.status = 'out-of-stock';
    // }
    // const result2 = await product.save()

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
