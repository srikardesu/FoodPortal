import { useState, useEffect } from "react";
import axios from "axios";
import React, { Component }  from 'react';
import { buttonUnstyledClasses } from "@mui/base";
import { MenuText, MenuItem, Select } from '@material-ui/core';
import Dropdown from 'react-mui-multiselect-dropdown'
import { makeStyles } from '@material-ui/core'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import purple from '@material-ui/core/colors/purple'
// require('dotenv').config();



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
    const [orders, setorders] = useState([]);
    const [status, setstatus] = useState("");
    const [maxcount, setmaxcount] = useState(0);

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
            .get("/api/order")
            .then((response) => {
                let user = [];
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].Vendor_Email === sessionStorage.getItem("email")) user.push(response.data[i]);
                    if (response.data[i].Status == "ACCEPTED" || response.data[i].Status == "COOKING" && response.data.Vendor_Email == sessionStorage.getItem("email")) {
                        setmaxcount(maxcount + 1);
                    }
                }
                setorders(user);
                let st = "";
                for (let i = 0; i < user.length; i++) {
                    st = user[i].Status;
                }
                setstatus(st);
            })
    }, []);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
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

    const handleClickReject = val => () => {
        axios.get("/api/order/" + val)
            .then((res) => {
                const newO = {
                    name: res.data["Vendor_Name"]
                }
                axios.post("/api/order/send2", newO)
                    .then((res) => {
                        console.log("send");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                const newOrder = {
                    Placed_Time: res.data.Placed_Time,
                    Vendor_Name: res.data.Vendor_Name,
                    Food_Name: res.data.Food_Name,
                    Quantity: res.data.Quantity,
                    Status: "REJECTED",
                    Cost: res.data.Cost,
                    Rating: res.data.Rating,
                    Buyer_Email: res.data.Buyer_Email,
                    Vendor_Email: res.data.Vendor_Email
                };

                let em = res.data.Buyer_Email;
                let ct = res.data.Cost;
                axios.get("/api/buyer")
                    .then((res) => {
                        let k = "";
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].Email === em) {
                                k = res.data[i]._id;
                            }
                        }

                        axios.get("/api/buyer/" + k)
                            .then((res) => {
                                const newBuyer = {
                                    Buyername: res.data.Buyername,
                                    Email: res.data.Email,
                                    Password: res.data.Password,
                                    Contact_No: res.data.Contact_No,
                                    Age: res.data.Age,
                                    Batch_Name: res.data.Batch_Name,
                                    Wallet: res.data.Wallet + ct
                                }

                                axios.post("/api/buyer/update/" + k, newBuyer)
                                    .then((res) => {
                                        // alert("Updated Wallet!");
                                    })
                            })
                    })

                // alert('here');

                axios.post("/api/order/update/" + val, newOrder)
                    .then((res) => {
                        // alert('updated successfully');
                    })
                    .catch((err) => {
                        alert('error :/');
                    });
            })
            .catch((err) => {

            })
    };

    const handleClickUpdate = val => () => {
        let h = "";
        axios
            .get("/api/order/" + val)
            .then((response) => {
                setstatus(response.data["Status"]);
                h = response.data["Status"];
                if (h === "PLACED") {
                    if (maxcount >= 10) {
                        alert('Already 10 orders :/');
                        return;
                    }

                    const newOrder = {
                        name: response.data["Vendor_Name"]
                    }
                    axios.post("/api/order/send", newOrder)
                        .then((res) => {
                            console.log("send");
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                    setstatus("ACCEPTED");
                    axios.get("/api/order/" + val)
                        .then((res) => {
                            const newOrder = {
                                Placed_Time: res.data.Placed_Time,
                                Vendor_Name: res.data.Vendor_Name,
                                Food_Name: res.data.Food_Name,
                                Quantity: res.data.Quantity,
                                Status: "ACCEPTED",
                                Cost: res.data.Cost,
                                Rating: res.data.Rating,
                                Buyer_Email: res.data.Buyer_Email,
                                Vendor_Email: res.data.Vendor_Email
                            };

                            // alert('here');

                            axios.post("/api/order/update/" + val, newOrder)
                                .then((res) => {
                                    // alert('updated successfully');
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    alert('error :/');
                                });
                        })
                        .catch((err) => {

                        })
                }
                if (h === "ACCEPTED") {
                    setstatus("COOKING");
                    axios.get("/api/order/" + val)
                        .then((res) => {
                            const newOrder = {
                                Placed_Time: res.data.Placed_Time,
                                Vendor_Name: res.data.Vendor_Name,
                                Food_Name: res.data.Food_Name,
                                Quantity: res.data.Quantity,
                                Status: "COOKING",
                                Cost: res.data.Cost,
                                Rating: res.data.Rating,
                                Buyer_Email: res.data.Buyer_Email,
                                Vendor_Email: res.data.Vendor_Email
                            };

                            // alert('here');

                            axios.post("/api/order/update/" + val, newOrder)
                                .then((res) => {
                                    // alert('updated successfully');
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    alert('error :/');
                                });
                        })
                        .catch((err) => {

                        })
                }
                if (h === "COOKING") {
                    setstatus("READY FOR PICKUP");
                    axios.get("/api/order/" + val)
                        .then((res) => {
                            const newOrder = {
                                Placed_Time: res.data.Placed_Time,
                                Vendor_Name: res.data.Vendor_Name,
                                Food_Name: res.data.Food_Name,
                                Quantity: res.data.Quantity,
                                Status: "READY FOR PICKUP",
                                Cost: res.data.Cost,
                                Rating: res.data.Rating,
                                Buyer_Email: res.data.Buyer_Email,
                                Vendor_Email: res.data.Vendor_Email
                            };

                            axios.post("/api/order/update/" + val, newOrder)
                                .then((res) => {
                                    // alert('updated successfully');
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    alert('error :/');
                                });
                        })
                        .catch((err) => {
                            alert('some error');
                        })
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // setOpen(true);
    };

    // const handleClickReject = () => {
    //     setstatus("REJECTED")
    //     // setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClose = () => {
        const newFood = {
            Foodname: Foodname,
            Veg: Veg,
            Price: Price,
            addons: { addonsname: addonsname, addonsprice: addonsprice },
            Rating: Rating,
            Tags: Tags,
            Vendor_email: Vendor_email
        };
        axios.post("/api/food/update/" + sessionStorage.getItem("foodid"), newFood)
            .then((res) => {
                alert('updated successfully');
            })
            .catch((err) => {
                alert('error :(');
            })
        window.location.reload();
        setOpen(false);
    };

    return (
        <div className="App">
            {/* <div>
                <p><input type="text" placeholder="Search..." onChange={(event) => setsearchTerm(event.target.value)} /></p>
                <p><label><input type='checkbox' onClick={() => isveg()} />Veg</label></p>
                <p><label><input type='checkbox' onClick={() => isNonveg()} />Non Veg</label></p>
                <p><input type="text" placeholder="Lower Price" onChange={(event) => setlowerprice(event.target.value)} /></p>
                <p><input type="text" placeholder="Higher Price" onChange={(event) => sethigherprice(event.target.value)} /></p>
            </div> */}
            <h3> Food Items </h3>
            <p>
                {orders.map(el => {
                    // sessionStorage.setItem("foodid", el._id);
                    return <div>
                        <div key={el._id}>
                            <div className="card">
                                <div className="card__body">
                                    <h2 className="card__title" align="left">Placed Time:   {el.Placed_Time}</h2>
                                    <div className="card__description" align="left">Food Name:   {el.Food_Name}</div>
                                    <div className="card__description" align="left">Quantity:   {el.Quantity}</div>
                                    {/* <div className="card__description" align="left">{el.addons.addonsname}: {el.addons.addonsprice}</div>
                                    <div className="card__description" align="left">{el.Rating}</div>
                                    <div className="card__description" align="left">{el.Tags.map(ff => ff + ' ')}</div>
                                    <div className="card__description" align="left">{el.Vendor_email}</div> */}
                                    <div className="card__description" align="left">Status:   {el.Status}</div>

                                </div>
                            </div >
                            <br></br>
                        </div> <div>
                            {
                                el.Status == "PLACED" ?
                                    <div>
                                        <Button variant="outlined" onClick={handleClickUpdate(el._id)}>
                                            MOVE TO NEXT STAGE
                                        </Button>
                                        <Button variant="outlined" onClick={handleClickReject(el._id)}>
                                            REJECT
                                        </Button></div> :
                                    el.Status == "ACCEPTED" ?
                                        <div>
                                            <Button variant="outlined" onClick={handleClickUpdate(el._id)}>
                                                MOVE TO NEXT STAGE
                                            </Button> </div> :
                                        el.Status == "COOKING" ?
                                            <div>
                                                <Button variant="outlined" onClick={handleClickUpdate(el._id)}>
                                                    MOVE TO NEXT STAGE
                                                </Button> </div> :
                                            el.Status == "READY FOR PICKUP" ? <div> Buyer yet to Pick up </div> :
                                                el.Status == "COMPLETED" ? <div> Order picked up successfully </div> :
                                                    el.Status == "REJECTED" ? <div> Notified to the buyer </div> : <div> Impossible to reach here </div>
                            }
                            {/* <Button variant="outlined" onClick={handleClickDelete}>
                                Delete Food Item
                            </Button> */}
                            {/* <Button variant="outlined" onClick={handleClickUpdate}>
                                MOVE TO NEXT STAGE
                            </Button> */}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Food Item</DialogTitle>
                                <DialogContent>
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
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleEditClose}>OK</Button>
                                </DialogActions>
                            </Dialog></div></div>
                })}
            </p>
        </div >
    )
};

export default Register;

