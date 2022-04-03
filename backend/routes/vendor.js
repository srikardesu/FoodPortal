const router = require('express').Router();
let Vendor = require('../models/vendor.model');

router.route('/').get((req, res) => {
    Vendor.find()
        .then(vendors => res.json(vendors))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Vendor.findOne({ Email: email, Password: password }).then(vendor => {
        // Check if user email exists
        if (!vendor) {
            return res.status(404).json({
                error: "Email not found",
            });
        }
        else {
            res.send(vendor);
            return vendor;
        }
    });
});

router.route('/add').post((req, res) => {
    const Managername = req.body.Managername;
    const ShopName = req.body.ShopName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Contact_No = req.body.Contact_No;
    const Opening_Time = req.body.Opening_Time;
    const Closing_Time = req.body.Closing_Time;

    const newVendor = new Vendor({
        Managername,
        ShopName,
        Email,
        Password,
        Contact_No,
        Opening_Time,
        Closing_Time
    });

    console.log(newVendor);

    newVendor.save()
        .then(() => res.json('Vendor added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Vendor.findById(req.params.id)
        .then(vendor => res.send(vendor))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Vendor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Vendor deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Vendor.findById(req.params.id)
        .then(vendor => {
            vendor.Managername = req.body.Managername;
            vendor.ShopName = req.body.ShopName;
            vendor.Email = req.body.Email;
            vendor.Password = req.body.Password;
            vendor.Contact_No = req.body.Contact_No;
            vendor.Opening_Time = req.body.Opening_Time;
            vendor.Closing_Time = req.body.Closing_Time;
            vendor.save()
                .then(() => res.json('Vendor updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;