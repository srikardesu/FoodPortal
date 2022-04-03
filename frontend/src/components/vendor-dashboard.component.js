import { useState, useEffect } from "react";
import axios from "axios";
import { buttonUnstyledClasses } from "@mui/base";
import { MenuText, MenuItem, Select } from '@material-ui/core';
import Dropdown from 'react-mui-multiselect-dropdown'
import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import purple from '@material-ui/core/colors/purple'



const Register = (props) => {
    const [food, setfood] = useState([]);
    const [Foodname, setFoodname] = useState("");
    const [Veg, setVeg] = useState("");
    const [Price, setPrice] = useState(0);
    const [addonsname, setaddonsname] = useState("");
    const [addonsprice, setaddonsprice] = useState(0);
    const [Rating, setRating] = useState(0);
    const [Tags, setTags] = useState("");
    const [Vendor_email, setVendor_email] = useState("");
    const [open, setOpen] = useState({});
    const [open2, setOpen2] = useState(false);

    // const [orders, setorders] = useState([]);

    const onChangeFoodname = (event) => {
        setFoodname(event.target.value);
    };

    const onChangeVeg = (event) => {
        setVeg(event.target.value);
    };

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const onChangeaddonsname = (event) => {
        setaddonsname(event.target.value);
    };

    const onChangeaddonsprice = (event) => {
        setaddonsprice(event.target.value);
    };

    const onChangeRating = (event) => {
        setRating(event.target.value);
    };

    const onChangeTags = (event) => {
        setTags(event.target.value);
    };

    const onChangeVendor_email = (event) => {
        setVendor_email(event.target.value);
    };

    useEffect(() => {
        axios
            .get("/api/food")
            .then((response) => {
                setfood(response.data);
                console.log(response.data);

                let v = {}
                for (let i = 0; i < response.data.length; i++) {
                    v[response.data[i]._id] = false;
                }
                setOpen(v);


                setOpen2(false);
                console.log(food);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleClickOpen(x) {
        let v = {}
        for (let i = 0; i < food.length; i++) {
            v[food[i]._id] = false;
        }
        v[x] = true;
        setOpen(v);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClickDelete = () => {
        axios.delete("/api/food/" + sessionStorage.getItem("foodid"))
            .then((res) => {
                alert('deleted successfully');
            })
            .catch((err) => {
                alert('error :(');
            })
        window.location.reload();
        // setOpen(true);
    };

    function handleClose(x) {
        let v = {}
        for (let i = 0; i < food.length; i++) {
            v[food[i]._id] = false;
        }
        v[x] = false;
        setOpen(v);
    };

    function handleEditClose(x) {
        axios.get("/api/food/" + x)
            .then((res) => {
                let a = res.data.addons.addonsname
                console.log('hi');
                console.log(Tags);
                const newFood = {
                    Foodname: Foodname ? Foodname: res.data.Foodname,
                    Veg: Veg ? Veg: res.data.Veg,
                    Price: Price ? Price: res.data.Price,
                    addons: {addonsname: addonsname ? addonsname: res.data.addons.addonsname, addonsprice: addonsprice ? addonsprice: res.data.addons.addonsprice},
                    Rating: Rating ? Rating: res.data.Rating,
                    Tags: Tags ? Tags: res.data["Tags"],
                    Vendor_email: Vendor_email ? Vendor_email: res.data.Vendor_email
                };
                // alert(x);
                axios.post("/api/food/update/" + x, newFood)
                    .then((res) => {
                        alert('updated successfully');
                        window.location.reload();
                    })
                    .catch((err) => {
                        alert('error :(');
                    })
                // window.location.reload();
                setOpen({ ...open, x: false });
            })
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleEditClose2 = () => {
        const newFood = {
            Foodname: Foodname,
            Veg: Veg,
            Price: Price,
            addons: { addonsname: addonsname, addonsprice: addonsprice },
            Rating: Rating,
            Tags: Tags,
            Vendor_email: Vendor_email
        };
        axios.post("/api/food/add/", newFood)
            .then((res) => {
                alert('added successfully');
            })
            .catch((err) => {
                alert('error :(');
            })
        window.location.reload();
        setOpen2(false);
    };

    return (
        <div className="App">
            <h3> Food Items </h3>
            <p>
                <Button variant="outlined" onClick={handleClickOpen2}>
                    Add Food Item
                </Button>
                {food.filter((val) => {
                    if (val.Vendor_email === sessionStorage.getItem("email")) {
                        return val;
                    }
                }).map(el => {
                    sessionStorage.setItem("foodid", el._id);
                    return <div>
                        <div key={el._id}>
                            <div className="card">
                                <div className="card__body">
                                    <h2 className="card__title" align="left">{el.Foodname}</h2>
                                    <div className="card__description" align="left">{el.Veg}</div>
                                    <div className="card__description" align="left">{el.Price}</div>
                                    <div className="card__description" align="left">{el.addons.addonsname}: {el.addons.addonsprice}</div>
                                    <div className="card__description" align="left">{el.Rating}</div>
                                    <div className="card__description" align="left">{el.Tags}</div>
                                    <div className="card__description" align="left">{el.Vendor_email}</div>
                                </div>
                            </div >
                            <br></br>
                        </div> <div> <button class="btn" id="${el._id}" variant="outlined" onClick={() => handleClickOpen(el._id)}>
                            Edit Food Item
                        </button>
                            <Button variant="outlined" onClick={handleClickDelete}>
                                Delete Food Item
                            </Button>
                            {/* <Button variant="outlined" onClick={handleClickUpdate}>
                                MOVE TO NEXT STAGE
                            </Button> */}
                            <Dialog open={open[el._id]} onClose={() => handleClose(el._id)}>
                                <DialogTitle>Food Item</DialogTitle>
                                <DialogContent>
                                    {/* <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We
                                        will send updates occasionally.
                                    </DialogContentText> */}
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Food Name"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeFoodname}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Veg"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeVeg}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Price"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangePrice}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="addons name"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeaddonsname}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="addons price"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeaddonsprice}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Rating"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeRating}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Tags"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeTags}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email Address"
                                        type="email"
                                        // value={el.Vendor_email}
                                        onChange={onChangeVendor_email}
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => handleClose(el._id)}>Cancel</Button>
                                    <Button onClick={() => handleEditClose(el._id)}>OK</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog open={open2} onClose={handleClose2}>
                                <DialogTitle> Add Food Item </DialogTitle>
                                <DialogContent>
                                    {/* <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We
                                        will send updates occasionally.
                                    </DialogContentText> */}
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Food Name"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeFoodname}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Veg"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeVeg}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Price"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangePrice}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="addons name"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeaddonsname}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="addons price"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeaddonsprice}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Rating"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeRating}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Tags"
                                        type="text"
                                        // value={el.Vendor_email}
                                        onChange={onChangeTags}
                                        fullWidth
                                        variant="standard"
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email Address"
                                        type="email"
                                        // value={el.Vendor_email}
                                        onChange={onChangeVendor_email}
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose2}>Cancel</Button>
                                    <Button onClick={handleEditClose2}>OK</Button>
                                </DialogActions>
                            </Dialog></div></div>
                })}
            </p>
        </div >
    )
};

export default Register;

