const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = require('./app');
const { default: mongoose } = require('mongoose');

// Database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database connected successfully`.red.bold);
});

// server 

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`.yellow.bold);
});
