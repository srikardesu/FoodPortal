const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {}
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const foodRouter = require('./routes/food');
const VendorRouter = require('./routes/vendor');
const BuyerRouter = require('./routes/buyer');
const OrderRouter = require('./routes/order');

app.use('/food', foodRouter);
app.use('/vendor', VendorRouter);
app.use('/buyer', BuyerRouter);
app.use('/order', OrderRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});