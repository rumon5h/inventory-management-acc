const mongoose = require('mongoose');

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

  module.exports = Product;