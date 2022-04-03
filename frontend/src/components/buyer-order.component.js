import { useState, useEffect } from "react";
import axios from "axios";
import { buttonUnstyledClasses } from "@mui/base";
import Button from '@mui/material/Button';
import React, { Component }  from 'react';


const Register = (props) => {
    const [order, setorder] = useState([]);
    const [status, setstatus] = useState("");
    const [Rating, setRating] = useState(0);

    useEffect(() => {
        axios
            .get("/api/order")
            .then((response) => {
                let user = [];
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].Buyer_Email === sessionStorage.getItem("email")) user.push(response.data[i]);
                }
                setorder(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleClickUpdate = val => () => {
        axios
            .get("/api/order/" + val)
            .then((response) => {
                setstatus(response.data.Status);
            })
            .catch((error) => {
                console.log(error);
            });
        if (status === "READY FOR PICKUP") {
            setstatus("COMPLETED");
            axios.get("/api/order/" + val)
                .then((res) => {
                    const newOrder = {
                        Placed_Time: res.data.Placed_Time,
                        Vendor_Name: res.data.Vendor_Name,
                        Food_Name: res.data.Food_Name,
                        Quantity: res.data.Quantity,
                        Status: "COMPLETED",
                        Cost: res.data.Cost,
                        Rating: res.data.Rating,
                        Buyer_Email: res.data.Buyer_Email,
                        Vendor_Email: res.data.Vendor_Email
                    };

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
        }
        else if (status === "COMPLETED") {

        }
        // setOpen(true);
    };

    function handleClickRating(e, x) {
        if (e.key === 'Enter') {
            axios.get("/api/order/" + x)
                .then((res) => {
                    let f = res.data.Food_Name;
                    let k = res.data;
                    axios.get("/api/order/")
                        .then((res) => {
                            let v = Number(0.0);
                            v = v + Number(e.target.value);
                            let l = 1;
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].Food_Name === f && res.data._id !== x) {
                                    l = l + 1;
                                    v = v + Number(res.data[i].Rating);
                                }
                            }
                            v = v / l;

                            const newOrder = {
                                Placed_Time: k.Placed_Time,
                                Vendor_Name: k.Vendor_Name,
                                Food_Name: k.Food_Name,
                                Quantity: k.Quantity,
                                Status: k.Status,
                                Cost: k.Cost,
                                Rating: Number(e.target.value),
                                Buyer_Email: k.Buyer_Email,
                                Vendor_Email: k.Vendor_Email
                            };

                            axios.post("/api/order/update/" + x, newOrder)
                                .then((res) => {
                                    axios.get("/api/food/")
                                        .then((res) => {
                                            let ii = 0;
                                            for (let i = 0; i < res.data.length; i++) {
                                                if (res.data[i].Foodname === f) {
                                                    ii = res.data[i]._id;
                                                }
                                            }
                                            axios.get("/api/food/" + ii)
                                                .then((res) => {
                                                    const newFood = {
                                                        Foodname: res.data.Foodname,
                                                        Veg: res.data.Veg,
                                                        Price: res.data.Price,
                                                        addons: { addonsname: res.data.addons.addonsname, addonsprice: res.data.addons.addonsprice },
                                                        Rating: Number(v),
                                                        Tags: res.data.Tags,
                                                        Vendor_email: res.data.Vendor_email
                                                    };
                                                    axios.post("/api/food/update/" + ii, newFood)
                                                        .then((res) => {
                                                            alert('updated food successfully');
                                                        })
                                                        .catch((err) => {
                                                            alert('error :(');
                                                        })
                                                })
                                        })
                                })
                                .catch((err) => {
                                    alert('error :/');
                                });
                        })
                })
                .catch((err) => {

                })
        }

        // setOpen(true);
    };

    return (
        <div className="App">
            <p>
                {order.map(el => {
                    return <div key={el._id}>
                        <div className="card">
                            <div className="card__body">
                                <h3 className="card__title" align="left">Placed Time: {el.Placed_Time}</h3>
                                <div className="card__description" align="left">Vendor Name:    {el.Vendor_Name}</div>
                                <div className="card__description" align="left">Food Name:    {el.Food_Name}</div>
                                <div className="card__description" align="left">Quantity:    {el.Quantity}</div>
                                <div className="card__description" align="left">Status:    {el.Status}</div>
                                <div className="card__description" align="left">Cost:    {el.Cost}</div>
                                <div className="card__description" align="left">Rating:    {el.Rating}</div>
                                <div className="card__description" align="left">Buyer Email:    {el.Buyer_Email}</div>
                            </div>
                            {
                                el.Status == "READY FOR PICKUP" ?
                                    <div>
                                        <Button variant="outlined" onClick={handleClickUpdate(el._id)}>
                                            PICKED UP
                                        </Button>
                                    </div> : el.Status == "COMPLETED" ? <div> <p><input type="text" placeholder="Rating" onKeyDown={(e) => handleClickRating(e, el._id)} /></p> </div> : <div />
                            }
                        </div >
                        <br></br>
                    </div>
                })}
            </p>
        </div >
    )
};

export default Register;
