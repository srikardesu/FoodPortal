const router = require('express').Router();
let Buyer = require('../models/buyer.model');

router.route('/').get((req, res) => {
    Buyer.find()
        .then(Buyers => res.json(Buyers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Buyer.findOne({ Email: email, Password: password }).then(buyer => {
        // Check if user email exists
        if (!buyer) {
            // console.log('doesnt works?');
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            // console.log('works?');
            // console.log(buyer);
            res.send(buyer);
            return buyer;
        }
    });
});

router.route('/add').post((req, res) => {
    const Buyername = req.body.Buyername;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Contact_No = req.body.Contact_No;
    const Age = Number(req.body.Age);
    const Batch_Name = req.body.Batch_Name;
    const Wallet = Number(req.body.Wallet);
    const favorites = req.body.favorites;

    const newBuyer = new Buyer({
        Buyername,
        Email,
        Password,
        Contact_No,
        Age,
        Batch_Name,
        Wallet,
        favorites
    });

    console.log(newBuyer);

    let flag = false;
    let arr = ["UG1", "UG2", "UG3", "UG4", "UG5"];

    flag = arr.includes(req.body.Batch_Name);


    if (!flag) {
        console.log('here?');
        res.status(400).json('Error: Wrong value entered for Batch Name ');
    }
    else {
        newBuyer.save()
            .then(() => res.json('Buyer added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route('/:id').get((req, res) => {
    Buyer.findById(req.params.id)
        .then(buyer => res.send(buyer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Buyer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Buyer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Buyer.findById(req.params.id)
        .then(buyer => {
            buyer.Buyername = req.body.Buyername;
            buyer.Email = req.body.Email;
            buyer.Password = req.body.Password;
            buyer.Contact_No = req.body.Contact_No;
            buyer.Age = Number(req.body.Age);
            buyer.Batch_Name = req.body.Batch_Name;
            buyer.Wallet = Number(req.body.Wallet);
            buyer.favorites = req.body.favorites;

            let flag = false;
            let arr = ["UG1", "UG2", "UG3", "UG4", "UG5"];

            flag = arr.includes(req.body.Batch_Name);


            if (!flag) {
                res.status(400).json('Error: Wrong value entered for Batch Name ');
            }
            else {
                buyer.save()
                    .then(() => res.json('buyer updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;