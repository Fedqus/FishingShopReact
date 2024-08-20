const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors')
const cors = require('cors')
require('dotenv').config();

const userRouter = require('./routes/users.route');
const productsRouter = require('./routes/products.route');

const app = express();

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/products', productsRouter);

const start = async () => {
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => {
            console.log(`Server is up on port ${PORT}.`);
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
    }

    app.use((req, res, next) => {
        next(createError(404, 'Not found'));
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            error: {
                status: err.status || 500,
                message: err.message
            }
        });
    });
}

start();