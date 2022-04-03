const router = require('express').Router();
let Orders = require('../models/orders.model');
require('dotenv').config();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'senderemail',                     //senders email
        pass: 'yourpasshere'                     //change pass
    }
});

router.route('/').get((req, res) => {
    Orders.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const Placed_Time = req.body.Placed_Time;
    const Vendor_Name = req.body.Vendor_Name;
    const Food_Name = req.body.Food_Name;
    const Quantity = Number(req.body.Quantity);
    const Status = req.body.Status;
    const Cost = Number(req.body.Cost);
    const Rating = Number(req.body.Rating);
    const Buyer_Email = req.body.Buyer_Email;
    const Vendor_Email = req.body.Vendor_Email;
    // const Opening_Time = req.body.Opening_Time;
    // const Closing_Time = req.body.Closing_Time;

    const newOrder = new Orders({
        Placed_Time,
        Vendor_Name,
        Food_Name,
        Quantity,
        Status,
        Cost,
        Rating,
        Buyer_Email,
        Vendor_Email
    });
    console.log(newOrder);

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/send").post((req, res) => {
    var mailOptions = {
        from: 'srikarbhavesh03@gmail.com',
        to: 'aryangup2002@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `${req.body["name"]} has accepted your order`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

router.route("/send2").post((req, res) => {
    var mailOptions = {
        from: 'senders email',                        //senders email
        to: 'receivers email',                        //receivers email
        subject: 'Sending Email using Node.js',       //subject of the email
        text: `${req.body["name"]} has rejected your order`  //body of the email
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

router.route('/:id').get((req, res) => {
    Orders.findById(req.params.id)
        .then(order => { console.log(order); res.json(order) })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Orders.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Orders.findById(req.params.id)
        .then(Order => {
            Order.Placed_Time = req.body.Placed_Time;
            Order.Vendor_Name = req.body.Vendor_Name;
            Order.Food_Name = req.body.Food_Name;
            Order.Quantity = Number(req.body.Quantity);
            Order.Status = req.body.Status;
            Order.Cost = Number(req.body.Cost);
            Order.Rating = Number(req.body.Rating);
            Order.Buyer_Email = req.body.Buyer_Email;
            Order.Vendor_Email = req.body.Vendor_Email;
            console.log(Order);
            Order.save()
                .then(() => res.json('Order updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;