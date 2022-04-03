import { useState, useEffect } from "react";
import axios from "axios";
import React, { Component } from 'react';
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
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const Register = (props) => {
    const [food, setfood] = useState([]);
    const [Foodname, setFoodname] = useState("");
    const [Veg, setVeg] = useState("");
    const [Price, setPrice] = useState(0);
    const [addonsname, setaddonsname] = useState("");
    const [addonsprice, setaddonsprice] = useState(0);
    const [Rating, setRating] = useState(0);
    const [Tags, setTags] = useState([]);
    const [Vendor_email, setVendor_email] = useState("");
    const [open, setOpen] = useState({});
    const [open2, setOpen2] = useState(false);
    const [ordersplaced, setordersplaced] = useState(0);
    const [pendingorders, setpendingorders] = useState(0);
    const [completedorders, setcompletedorders] = useState(0);
    const [sortedfoodlist, setsortedfoodlist] = useState({});
    const [ug1, setug1] = useState(0);
    const [ug2, setug2] = useState(0);
    const [ug3, setug3] = useState(0);
    const [ug4, setug4] = useState(0);
    const [ug5, setug5] = useState(0);
    const [age, setage] = useState({});
    const [dat, setdat] = useState([
        { quarter: 1, earnings: 0 },
        { quarter: 2, earnings: 0 },
        { quarter: 3, earnings: 0 },
        { quarter: 4, earnings: 0 },
        { quarter: 5, earnings: 0 },
    ]);
    const [dat2, setdat2] = useState([
        { quarter1: 1, earnings1: 0 },
        { quarter1: 2, earnings1: 0 },
        { quarter1: 3, earnings1: 0 },
        { quarter1: 4, earnings1: 0 },
        { quarter1: 5, earnings1: 0 },
        { quarter1: 6, earnings1: 0 },
        { quarter1: 7, earnings1: 0 },
    ]);
    let data = []
    let data2 = []
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
                console.log(response.data);
                let a = 0;
                let b = 0;
                let c = 0;
                let u1 = 0;
                let u2 = 0;
                let u3 = 0;
                let u4 = 0;
                let u5 = 0;
                let a1 = 0;
                let a2 = 0;
                let a3 = 0;
                let a4 = 0;
                let a5 = 0;
                let a6 = 0;
                let a7 = 0;
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].Vendor_Email == sessionStorage.getItem("email")) {
                        let x = response.data[i].Food_Name;
                        let v = {}
                        v = sortedfoodlist;
                        v[x] = 0;
                        setsortedfoodlist(v);
                        a = a + 1;
                    }
                    if (response.data[i].Vendor_Email == sessionStorage.getItem("email") && (response.data[i].Status !== "COMPLETED" && response.data[i].Status !== "REJECTED")) {
                        b = b + 1;
                    }
                    if (response.data[i].Vendor_Email == sessionStorage.getItem("email") && (response.data[i].Status === "COMPLETED")) {
                        c = c + 1;
                        let b_e = response.data[i].Buyer_Email;
                        axios.get("/api/buyer")
                            .then((res) => {
                                for (let i = 0; i < res.data.length; i++) {
                                    if (res.data[i].Email == b_e) {
                                        // alert('ye');
                                        if (res.data[i].Batch_Name == "UG1") {
                                            setug1(ug1 + 1);
                                            u1++;
                                        }
                                        if (res.data[i].Batch_Name == "UG2") {
                                            setug2(ug2 + 1);
                                            u2++;
                                        }
                                        if (res.data[i].Batch_Name == "UG3") {
                                            setug3(ug3 + 1);
                                            u3++;
                                        }
                                        if (res.data[i].Batch_Name == "UG4") {
                                            setug4(ug4 + 1);
                                            u4++;
                                        }
                                        if (res.data[i].Batch_Name == "UG5") {
                                            setug5(ug5 + 1);
                                            u5++;
                                        }
                                        if (res.data[i].Age == 16) {
                                            a1++;
                                        }
                                        if (res.data[i].Age == 17) {
                                            //setug2(ug2 + 1);
                                            a2++;
                                        }
                                        if (res.data[i].Age == 18) {
                                            // setug3(ug3 + 1);
                                            a3++;
                                        }
                                        if (res.data[i].Age == 19) {
                                            // setug4(ug4 + 1);
                                            a4++;
                                        }
                                        if (res.data[i].Age == 20) {

                                            a5++;
                                        }
                                        if (res.data[i].Age == 21) {
                                            // setug4(ug4 + 1);
                                            a6++;
                                        }
                                        if (res.data[i].Age == 22) {

                                            a7++;
                                        }

                                    }
                                }
                                // alert(u1);
                                // alert(u2);
                                // alert(u3);
                                // alert(u4);
                                // alert(u5);
                                data = [
                                    { quarter: 1, earnings: u1 },
                                    { quarter: 2, earnings: u2 },
                                    { quarter: 3, earnings: u3 },
                                    { quarter: 4, earnings: u4 },
                                    { quarter: 5, earnings: u5 },
                                ];
                                data2 = [
                                    { quarter1: 1, earnings1: a1 },
                                    { quarter1: 2, earnings1: a2 },
                                    { quarter1: 3, earnings1: a3 },
                                    { quarter1: 4, earnings1: a4 },
                                    { quarter1: 5, earnings1: a5 },
                                    { quarter1: 6, earnings1: a6 },
                                    { quarter1: 7, earnings1: a7 },
                                ];
                                console.log(dat);
                                setdat(data);
                                setdat2(data2);
                                // setdat(data);
                                console.log(data);
                            })
                    }
                }
                setordersplaced(a);
                setcompletedorders(c);
                setpendingorders(b);
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].Vendor_Email == sessionStorage.getItem("email")) {
                        let x = response.data[i].Food_Name;
                        let v = {}
                        v = sortedfoodlist;
                        let k = v[x];
                        v[x] = k + 1;
                        setsortedfoodlist(v);
                    }
                }

                var sortable = [];
                for (var v in sortedfoodlist) {
                    sortable.push([v, sortedfoodlist[v]]);
                }

                sortable.sort(function (a, b) {
                    return -1 * (a[1] - b[1]);
                });

                var objSorted = {}
                sortable.forEach(function (item) {
                    objSorted[item[0]] = item[1]
                })

                setsortedfoodlist(objSorted);
                console.log(sortedfoodlist);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="App">
            <h3>Top 5 Food Items </h3>
            <p>
                {
                    Object.keys(sortedfoodlist).length < 1 ?
                        <div> <p> {
                            Object.keys(sortedfoodlist).map(function (key, index) {
                                return <div> {key} </div>
                            })
                        }
                        </p>
                        </div> :
                        <div>
                            <div>
                                <div> {Object.keys(sortedfoodlist)[0]} </div>
                                <div> {Object.keys(sortedfoodlist)[1]} </div>
                                <div> {Object.keys(sortedfoodlist)[2]} </div>
                                <div> {Object.keys(sortedfoodlist)[3]} </div>
                                <div> {Object.keys(sortedfoodlist)[4]} </div>
                            </div> </div>
                }
            </p>
            <h3> Orders Placed. </h3>
            <div>
                {ordersplaced}
            </div>
            <h3> Pending Orders. </h3>
            <div>
                {pendingorders}
            </div>
            <h3> Completed Orders. </h3>
            <div>
                {completedorders}
            </div>
            <h3> Graphs </h3>
            {<div>Batch Wise</div>}
            <div>
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={["UG 1", "UG 2", "UG 3", "UG 4", "UG 5"]}
                    />
                    <VictoryAxis
                        dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    // tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                        data={dat}
                        x="quarter"
                        y="earnings"
                    />
                </VictoryChart>
                {<div>Age Wise</div>}
                {<div>{console.log(dat2)}</div>}
                <VictoryChart
                    // domainPadding will add space to each side of VictoryBar to
                    // prevent it from overlapping the axis
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={[1, 2, 3, 4, 5, 6, 7]}
                        tickFormat={["16", "17", "18", "19", "20", "21", "22"]}
                    />
                    <VictoryAxis
                        dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    // tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                        data={dat2}
                        x="quarter1"
                        y="earnings1"
                    />
                </VictoryChart>
            </div>
        </div >
    )
};

export default Register;

