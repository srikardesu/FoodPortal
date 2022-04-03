import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { Component } from 'react';
// import PasswordInputText from 'react-native-hide-show-password-input';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Register = (props) => {
    const [type, settype] = useState("");
    const [Buyername, setBuyerName] = useState("");
    const [BuyerEmail, setBuyerEmail] = useState("");
    const [BuyerPassword, setBuyerPassword] = useState("");
    const [BuyerContact_No, setBuyerContact_No] = useState("");
    const [Age, setAge] = useState("");
    const [Batch_Name, setBatch_Name] = useState("");
    const [Managername, setManagerName] = useState("");
    const [ShopName, setShopName] = useState("");
    const [VendorEmail, setVendorEmail] = useState("");
    const [VendorPassword, setVendorPassword] = useState("");
    const [VendorContact_No, setVendorContact_No] = useState("");
    const [Opening_Time, setOpening_Time] = useState("");
    const [Closing_Time, setClosing_Time] = useState("");

    const onChangeBuyername = (event) => {
        setBuyerName(event.target.value);
    };

    const onChangeBuyerEmail = (event) => {
        setBuyerEmail(event.target.value);
    };

    const onChangeBuyerPassword = (event) => {
        setBuyerPassword(event.target.value);
    };

    const onChangeBuyerContact_No = (event) => {
        setBuyerContact_No(event.target.value);
    };

    const onChangeAge = (event) => {
        setAge(event.target.value);
    };

    const onChangeBatch_name = (event) => {
        setBatch_Name(event.target.value);
    };

    const onChangeManagername = (event) => {
        setManagerName(event.target.value);
    };

    const onChangeShopName = (event) => {
        setShopName(event.target.value);
    };

    const onChangeVendorEmail = (event) => {
        setVendorEmail(event.target.value);
    };

    const onChangeVendorPassword = (event) => {
        setVendorPassword(event.target.value);
    };

    const onChangeVendorContact_No = (event) => {
        setVendorContact_No(event.target.value);
    };

    const onChangeOpening_Time = (event) => {
        setOpening_Time(event.target.value);
    };

    const onChangeClosing_Time = (event) => {
        setClosing_Time(event.target.value);
    };

    const onChangetype = (event) => {
        settype(event.target.value);
    }

    const resetInputs = () => {
        settype("");
        setBuyerName("");
        setBuyerEmail("");
        setBuyerPassword("");
        setBuyerContact_No("");
        setAge("");
        setBatch_Name("");
        setManagerName("");
        setShopName("");
        setVendorEmail("");
        setVendorPassword("");
        setVendorContact_No("");
        setOpening_Time("");
        setClosing_Time("");

    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (type == "Buyer") {
            const newBuyer = {
                Buyername: Buyername,
                Email: BuyerEmail,
                Password: BuyerPassword,
                Contact_No: BuyerContact_No,
                Age: Age,
                Batch_Name: Batch_Name,
                Wallet: 0
            };

            console.log(newBuyer);

            axios
                .post("/api/buyer/add", newBuyer)
                .then((response) => {
                    alert("Registration as buyer successful");
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log(err);
                    alert("Enter valid credentials");
                });
        }
        else if (type == "Vendor") {
            const newVendor = {
                Managername: Managername,
                ShopName: ShopName,
                Email: VendorEmail,
                Password: VendorPassword,
                Contact_No: VendorContact_No,
                Opening_Time: Opening_Time,
                Closing_Time: Closing_Time
            };

            axios
                .post("/api/vendor/add", newVendor)
                .then((response) => {
                    alert("Registration as vendor successful");
                    console.log(response.data);
                })
                .catch((err) => {
                    alert("Enter valid credentials");
                });
        }

        resetInputs();

    };

    if (type == "") {
        return (
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    onChange={onChangetype}
                >
                    <MenuItem value="Buyer">Buyer</MenuItem>
                    <MenuItem value="Vendor">Vendor</MenuItem>
                </Select>
            </FormControl>
        );
    }
    else if (type == "Buyer") {
        return (
            <Grid container align={"center"} spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        onChange={onChangetype}
                    >
                        <MenuItem value="Buyer">Buyer</MenuItem>
                        <MenuItem value="Vendor">Vendor</MenuItem>
                    </Select>
                </FormControl>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={Buyername}
                        onChange={onChangeBuyername}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={BuyerEmail}
                        onChange={onChangeBuyerEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={BuyerPassword}
                        onChange={onChangeBuyerPassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contact No"
                        variant="outlined"
                        value={BuyerContact_No}
                        onChange={onChangeBuyerContact_No}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={Age}
                        onChange={onChangeAge}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Batch Name"
                        variant="outlined"
                        value={Batch_Name}
                        onChange={onChangeBatch_name}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Register as Buyer
                    </Button>
                </Grid>
            </Grid>
        );
    }
    else {
        return (
            <Grid container align={"center"} spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Type"
                        onChange={onChangetype}
                    >
                        <MenuItem value="Buyer">Buyer</MenuItem>
                        <MenuItem value="Vendor">Vendor</MenuItem>
                    </Select>
                </FormControl>
                <Grid item xs={12}>
                    <TextField
                        label="ManagerName"
                        variant="outlined"
                        value={Managername}
                        onChange={onChangeManagername}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="ShopName"
                        variant="outlined"
                        value={ShopName}
                        onChange={onChangeShopName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={VendorEmail}
                        onChange={onChangeVendorEmail}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={VendorPassword}
                        onChange={onChangeVendorPassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Contact No"
                        variant="outlined"
                        value={VendorContact_No}
                        onChange={onChangeVendorContact_No}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Opening Time"
                        variant="outlined"
                        value={Opening_Time}
                        onChange={onChangeOpening_Time}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Closing Time"
                        variant="outlined"
                        value={Closing_Time}
                        onChange={onChangeClosing_Time}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmit}>
                        Register as Vendor
                    </Button>
                </Grid>
            </Grid>
        );
    }
};

export default Register;