const router = require('express').Router();
let Food = require('../models/food.model');

router.route('/').get((req, res) => {
    Food.find()
        .then(Foods => res.json(Foods))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const Foodname = req.body.Foodname;
    const Veg = req.body.Veg;
    const Price = Number(req.body.Price);
    const addons = req.body.addons;
    const Rating = Number(req.body.Rating);
    const Tags = req.body.Tags;
    const Vendor_email = req.body.Vendor_email;
    // const Vendor_Name = req.body.Vendor_Name;
    // const Opening_Time = req.body.Opening_Time;
    // const Closing_Time = req.body.Closing_Time;

    const newFood = new Food({
        Foodname,
        Veg,
        Price,
        addons,
        Rating,
        Tags,
        Vendor_email,
        // Vendor_Name,
        // Opening_Time,
        // Closing_Time
    });

    console.log(newFood);

    newFood.save()
        .then(() => res.json('Food added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Food.findById(req.params.id)
        .then(Food => res.json(Food))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(() => res.json('Food deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Food.findById(req.params.id)
        .then(Food => {
            Food.Foodname = req.body.Foodname;
            Food.Veg = req.body.Veg;
            Food.Price = Number(req.body.Price);
            Food.addons = req.body.addons;
            Food.Rating = Number(req.body.Rating);
            Food.Tags = req.body.Tags;
            Food.Vendor_email = req.body.Vendor_email;
            // Food.Vendor_Name = req.body.Vendor_Name;
            // Food.Opening_Time = req.body.Opening_Time;
            // Food.Closing_Time = req.body.Closing_Time;

            Food.save()
                .then(() => res.json('Food updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;