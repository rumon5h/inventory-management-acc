const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

//Middlewarese
app.use(cors());
app.use(express.json());

// Schema design
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a valid name.'],
        trim: true,
        unique: [true, 'Name must be unique.'],
        minLength: [true, 'Name must be at least  character'],
        maxLength: [true, 'Name must be less than 100 characters'],
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please provide a valid price.'],
        min: [0, "Price can't be negative."]
    },
    unit: {
        type: String,
        required : true,
        enum: {
            value: ['kg', 'litre', 'pcs'],
            message: 'Please provide a valid unit.'
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide a valid quantity.'],
        min: [0, "Quantity can't be less than 1."],
        validate: {
            validator: function (value) {
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true;
                }else{
                    return [false, 'Quantity must be an integer.']
                }
        }
    },
    stauts:{
        type: String,
        enum: ['in-stock', 'out-af-stock', 'discontinued.']
    }
})
app.get('/', (req, res) => {
    res.send('Hello World!');
})

module.exports = app;