import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import axios from "axios";
import { buttonUnstyledClasses } from "@mui/base";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { Component } from 'react';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { MenuText, MenuItem, Select } from '@material-ui/core';
import Dropdown from 'react-mui-multiselect-dropdown'
import { makeStyles } from '@material-ui/core'
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import purple from '@material-ui/core/colors/purple'
import { ConnectingAirportsOutlined } from '@mui/icons-material';
// import { search } from '../../backend/routes/order';

const useStyles = makeStyles((theme) => ({
    error: {
        color: theme.palette.error.dark,
        fontSize: '1em'
    },
    checkBox: {
        color: purple['700']
    }
}))



const Register = (props) => {
    const [food, setfood] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const [lowerprice, setlowerprice] = useState(0);
    const [higherprice, sethigherprice] = useState(10000);
    const [isVeg, setisVeg] = useState("");
    const [isNonVeg, setisNonVeg] = useState("");
    const [favorites, setfavorites] = useState([]);
    const [par1, changepar] = useState(0);
    const [par2, changepar2] = useState(0);
    const [wallet, changewallet] = useState(0);
    const [addonprice, setaddonprice] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [vendorname, setvendorname] = useState("");
    const [vendordata, setvendordata] = useState([]);
    // const [selected, setSelected] = useState([]);
    const [skills, setSkills] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])
    const [sortName, setSortName] = useState(true);
    const [sortRating, setSortRating] = useState(true);
    const [openingtime, setopeningtime] = useState("");
    const [closingtime, setclosingtime] = useState("");
    const [flag, setflag] = useState({});
    const [shop, setshop] = useState([]);            // the handlechange part
    const [shopName, setshopName] = useState([]);    // all shopname
    const [shopee, setshopee] = useState({});        // id, shopname
    const [tag, settag] = useState([]);              // handlechange2 part
    const [tagName, settagName] = useState([]);      // all TagNames
    const [tagee, settagee] = useState({});          // id, tags
    const [opened, setopened] = useState({});
    const theme = useTheme();

    const classes = useStyles()
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const populateData = () => {
        const skillsData = [
            { id: 1, name: 'React Js' },
            { id: 2, name: 'Angular' },
            { id: 3, name: 'Node JS' }
        ]
        setSkills(skillsData)
    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    useEffect(() => {
        axios.get("/api/food")
            .then((response) => {
                let vv = {}
                for (let i = 0; i < response.data.length; i++) {
                    let ii = response.data[i]._id;
                    let v_e = response.data[i].Vendor_email;
                    axios.get("/api/vendor")
                        .then((res) => {
                            let ot = "00:00:00";
                            let ct = "00:00:00";
                            let nam = "";
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].Email == v_e) {
                                    ot = res.data[i].Opening_Time;
                                    ct = res.data[i].Closing_Time;
                                    nam = res.data[i].ShopName;
                                }
                            }
                            var startTime = ot;
                            var endTime = ct;

                            var currentDate = new Date()

                            var startDate = new Date(currentDate.getTime());
                            startDate.setHours(startTime.split(":")[0]);
                            startDate.setMinutes(startTime.split(":")[1]);
                            startDate.setSeconds(startTime.split(":")[2]);

                            var endDate = new Date(currentDate.getTime());
                            endDate.setHours(endTime.split(":")[0]);
                            endDate.setMinutes(endTime.split(":")[1]);
                            endDate.setSeconds(endTime.split(":")[2]);

                            let valid = startDate < currentDate && endDate > currentDate 
                            
                            vv[ii] = (valid);
                        })
                }
                setflag(vv);
            })
        axios
            .get("/api/food")
            .then((response) => {
                let gg = {}
                for (let i = 0; i < response.data.length; i++) {
                    gg[response.data[i]._id] = "";
                }
                let fg = []
                for (let i = 0; i < response.data.length; i++) {
                    gg[response.data[i]._id] = response.data[i].Tags;
                    let tgs = [];
                    tgs = response.data[i].Tags.split(",");
                    for (let j = 0; j < tgs.length; j++) {
                        if (!fg.includes(tgs[j])) fg.push(tgs[j]);
                    }
                }
                settagee(gg);
                settagName(fg);

                setfood(response.data);
                let v = {}
                for (let i = 0; i < response.data.length; i++) {
                    v[response.data[i]._id] = false;
                }
                let g = {}
                for (let i = 0; i < response.data.length; i++) {
                    g[response.data[i]._id] = "";
                }
                setshopee(g);
                axios.get("/api/food")
                    .then((res) => {
                        for (let i = 0; i < res.data.length; i++) {
                            let v_e = res.data[i].Vendor_email;
                            let id = res.data[i]._id;
                            let ii = res.data[i]._id;
                            let vv = flag;
                            let SHOP = "";
                            let dum = false;
                            axios.get("/api/vendor")
                                .then((res) => {
                                    for (let i = 0; i < res.data.length; i++) {
                                        let v = shopName;
                                        if (!v.includes(res.data[i].ShopName)) v.push(res.data[i].ShopName);
                                        if (v_e == res.data[i].Email) {
                                            SHOP = res.data[i].ShopName;
                                        }
                                        setshopName(v);
                                    }
                                    let g = shopee
                                    g[id] = SHOP;
                                    setshopee(g);
                                })
                        }
                    })
            })
            .catch((error) => {
                console.log(error);
            });
        populateData()
        axios
            .get("/api/buyer/" + sessionStorage.getItem("id"))
            .then((response) => {
                setfavorites(response.data.favorites);
                changewallet(response.data.Wallet);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        console.log(flag);
    }, [flag]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setshop(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange2 = (event) => {
        const {
            target: { value },
        } = event;
        settag(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    function fav(p) {
        if (!(favorites.includes(p))) {
            setfavorites([...favorites, p]);
            axios.get("/api/buyer/" + sessionStorage.getItem("id"))
                .then((res) => {
                    let user = res.data;
                    let favs = favorites;
                    if (!(favs.includes(p))) favs.push(p);
                    user.favorites = favs;
                    // alert(user.favorites);
                    axios.post("/api/buyer/update/" + sessionStorage.getItem("id"), user)
                        .then((res) => {
                            // alert(res.data.favorites);
                            alert("updated favorites");
                        })
                        .catch((err) => {
                            alert("error catch");
                        })
                })
        }
        // alert('added');
    }

    function isveg() {
        if (par1 == 0)
            setisVeg("Veg");
        else
            setisVeg("");
        console.log(isVeg);
        changepar(1 - par1);
    }
    function isNonveg() {
        if (par2 == 0)
            setisNonVeg("Non Veg");
        else
            setisNonVeg("");
        changepar2(1 - par2);
    }
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            changewallet(wallet + Number(e.target.value));
            axios
                .get("/api/buyer/" + sessionStorage.getItem("id"))
                .then((response) => {
                    let user = response.data
                    user.Wallet = wallet + Number(e.target.value);
                    alert(user.Wallet);
                    axios.post("/api/buyer/update/" + sessionStorage.getItem("id"), user)
                        .then((res) => {
                            alert("Updated Sucessfully!");
                        })
                        .catch((err) => {
                            alert("Wrong :(");
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function addons(e) {
        if (e.target.value == "None")
            setaddonprice(0);
        if (e.target.value == "Cheese")
            setaddonprice(10);
        if (e.target.value == "Paneer")
            setaddonprice(15);
        if (e.target.value == "Egg")
            setaddonprice(20);
        if (e.target.value == "Fried")
            setaddonprice(10);
    }

    const sortChange = () => {
        let foodTemp = food;
        const fl = sortName;
        foodTemp.sort((a, b) => {
            if (a.Price != undefined && b.Price != undefined) {
                return (1 - fl * 2) * (Number(a.Price) - Number(b.Price));
            } else {
                return 1;
            }
        });
        setfood(foodTemp);
        setSortName(!sortName);
    };

    const sortChange2 = () => {
        let foodTemp = food;
        const fl = sortRating;
        foodTemp.sort((a, b) => {
            if (a.Rating != undefined && b.Rating != undefined) {
                return (1 - fl * 2) * (Number(a.Rating) - Number(b.Rating));
            } else {
                return 1;
            }
        });
        setfood(foodTemp);
        setSortRating(!sortRating);
    };

    function buy(x, y, z) {
        if (wallet < quantity * (addonprice + x)) {
            alert('Add more money into the wallet!');
        }
        else {
            alert("Bought successfully!");
            changewallet(wallet - quantity * (addonprice + x));
            axios
                .get("/api/buyer/" + sessionStorage.getItem("id"))
                .then((response) => {
                    let user = response.data
                    user.Wallet = wallet - quantity * (addonprice + x);
                    axios.post("/api/buyer/update/" + sessionStorage.getItem("id"), user)
                        .then((res) => {
                            axios
                                .get("/api/vendor/")
                                .then((response) => {
                                    let user = "";
                                    for (let i = 0; i < response.data.length; i++) {
                                        if (response.data[i].Email === z) user = response.data[i].Managername;
                                    }

                                    // alert(user);
                                    setvendorname(user);
                                    axios.get("/api/food/")
                                        .then((res) => {
                                            let v = ""
                                            for (let i = 0; i < res.data.length; i++) {
                                                if (res.data[i].Foodname === y) v = res.data[i].Vendor_email;
                                            }
                                            const newOrder = {
                                                Placed_Time: new Date().toLocaleTimeString(),
                                                Vendor_Name: user,
                                                Food_Name: y,
                                                Quantity: quantity,
                                                Status: "PLACED",
                                                Cost: quantity * (addonprice + x),
                                                Rating: 0,
                                                Buyer_Email: sessionStorage.getItem("email"),
                                                Vendor_Email: v
                                            };

                                            axios
                                                .post("/api/order/add", newOrder)
                                                .then((response) => {
                                                    alert("Order added successful");
                                                    //  
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    alert("No vendors available :/");
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                        })
                        .catch((err) => {
                            alert("Wrong :(");
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div className="App">
            <h1>Wallet: {wallet}</h1>
            <p><input type="text" placeholder="Add to Wallet.." onKeyPress={handleKeyPress} /></p>
            <div>
                <p><input type="text" placeholder="Search..." onChange={(event) => setsearchTerm(event.target.value)} /></p>
                <p><label><input type='checkbox' onClick={() => isveg()} />Veg</label></p>
                <p><label><input type='checkbox' onClick={() => isNonveg()} />Non Veg</label></p>
                <p><input type="text" placeholder="Lower Price" onChange={(event) => setlowerprice(event.target.value)} /></p>
                <p><input type="text" placeholder="Higher Price" onChange={(event) => sethigherprice(event.target.value)} /></p>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Shop Name</InputLabel>

                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={shop}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {shopName.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={shop.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>

                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={tag}
                        onChange={handleChange2}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {tagName.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={tag.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid item xs={12} md={9} lg={9}>
                    {/* <Paper> */}
                    <Table size="small">
                        {/* <TableHead> */}
                        {/* <TableRow> */}
                        <TableCell> Sort by Item Price </TableCell>
                        <TableCell>
                            {" "}
                            <Button onClick={sortChange}>
                                {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </Button>
                        </TableCell>
                        <TableCell> Sort by Item Rating </TableCell>
                        <TableCell>
                            {" "}
                            <Button onClick={sortChange2}>
                                {sortRating ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                            </Button>
                        </TableCell>
                    </Table>
                </Grid>
            </div >
            <p>
                {food.filter((val) => {
                    if (searchTerm == "") {
                        return val;
                    }
                    else {
                        let start1 = 0;
                        let end1 = val.Foodname.length - 1;
                        let start2 = 0;
                        let end2 = searchTerm.length - 1;
                        let f = false;
                        while (start1 <= end1) {
                            if (searchTerm[start2].toLowerCase() == val.Foodname[start1].toLowerCase()) {
                                if (start2 < end2) {
                                    start2++;
                                }
                                else {
                                    f = true;
                                    break;
                                }
                            }
                            start1++;
                        }
                        if (f) return val;
                    }

                })
                    .filter((val) => {
                        if (isVeg == "") {
                            return val;
                        }
                        else if (val.Veg == isVeg) {
                            return val;
                        }
                    }).filter((val) => {
                        if (isNonVeg == "") {
                            return val;
                        }
                        else if (val.Veg == isNonVeg) {
                            return val;
                        }
                    }).filter((val) => {
                        if (val.Price >= lowerprice && val.Price <= higherprice) {
                            return val;
                        }
                    }).filter((val) => {
                        if (val.Price >= lowerprice && val.Price <= higherprice) {
                            return val;
                        }
                    })
                    .filter((val) => {
                        if (flag[val._id] == true) {
                            return val;
                        }
                    })
                    .filter((val) => {
                        if (shop.length == 0) {
                            return val;
                        }
                        else if (shop.includes(shopee[val._id])) {
                            return val;
                        }
                    })
                    .filter((val) => {
                        let k = tagee[val._id];
                        let kk = k.split(",");
                        let f = false;
                        for (let i = 0; i < kk.length; i++) {
                            if (tag.includes(kk[i])) f = true;
                        }
                        if (tag.length == 0) {
                            return val;
                        }
                        else if (f) {
                            return val;
                        }
                    })
                    .map(el => {
                        return <div key={el._id}>
                            <div className="card">
                                <div className="card__body">
                                    <h2 className="card__title" align="left">{el.Foodname}</h2>
                                    <div className="card__description" align="left">{el.Veg}</div>
                                    <div className="card__description" align="left">{el.Price}</div>
                                    <div className="card__description" align="left">{el.addons.addonsname}: {el.addons.addonsprice}</div>
                                    <div className="card__description" align="left">{el.Rating}</div>
                                    <div className="card__description" align="left">{el.Tags}</div>
                                    <div className="card__description" align="left">{el.Vendor_email}</div>
                                    <p><button classname="card__btn" onClick={() => fav(el.Foodname)}> add to favorites </button></p>
                                    <p><input type="text" placeholder="Quantity" onChange={(event) => setquantity(event.target.value)} /></p>
                                    <label for="addons">Addons:</label>
                                    <select id="addons" name="addons" onChange={(e) => addons(e)}>
                                        <option value="None" id="None" >None</option>
                                        <option value="Cheese" id="Cheese" >Cheese</option>
                                        <option value="Paneer" id="Paneer">Paneer</option>
                                        <option value="Egg" id="Egg">Egg</option>
                                        <option value="Fried" id="Fried">Fried</option>
                                    </select>
                                    <p><button classname="card__btn" onClick={() => buy(el.Price, el.Foodname, el.Vendor_email)}> buy </button></p>
                                </div>
                            </div >
                            <br></br>
                        </div>
                    })
                }
            </p>
            <p>
                {food.filter((val) => {
                    if (flag[val._id] == false) {
                        return val;
                    }
                }).filter((val) => {
                    if (searchTerm == "") {
                        return val;
                    }
                    else {
                        let start1 = 0;
                        let end1 = val.Foodname.length - 1;
                        let start2 = 0;
                        let end2 = searchTerm.length - 1;
                        let f = false;
                        while (start1 <= end1) {
                            if (searchTerm[start2].toLowerCase() == val.Foodname[start1].toLowerCase()) {
                                if (start2 < end2) {
                                    start2++;
                                }
                                else {
                                    f = true;
                                    break;
                                }
                            }
                            start1++;
                        }
                        if (f) return val;
                    }

                })
                    .filter((val) => {
                        if (isVeg == "") {
                            return val;
                        }
                        else if (val.Veg == isVeg) {
                            return val;
                        }
                    }).filter((val) => {
                        if (isNonVeg == "") {
                            return val;
                        }
                        else if (val.Veg == isNonVeg) {
                            return val;
                        }
                    }).filter((val) => {
                        if (val.Price >= lowerprice && val.Price <= higherprice) {
                            return val;
                        }
                    }).filter((val) => {
                        if (val.Price >= lowerprice && val.Price <= higherprice) {
                            return val;
                        }
                    })
                    .filter((val) => {
                        if (shop.length == 0) {
                            return val;
                        }
                        else if (shop.includes(shopee[val._id])) {
                            return val;
                        }
                    })
                    .filter((val) => {
                        let k = tagee[val._id];
                        let kk = k.split(",");
                        let f = false;
                        for (let i = 0; i < kk.length; i++) {
                            if (tag.includes(kk[i])) f = true;
                        }
                        if (tag.length == 0) {
                            return val;
                        }
                        else if (f) {
                            return val;
                        }
                    })
                    .map((el) => {
                        return <div key={el._id}>
                            <div className="card">
                                <div className="card__body">
                                    <h2 className="card__title" align="left">{el.Foodname}</h2>
                                    <div className="card__description" align="left">{el.Veg}</div>
                                    <div className="card__description" align="left">{el.Price}</div>
                                    <div className="card__description" align="left">{el.addons.addonsname}: {el.addons.addonsprice}</div>
                                    <div className="card__description" align="left">{el.Rating}</div>
                                    <div className="card__description" align="left">{el.Tags}</div>
                                    <div className="card__description" align="left">{el.Vendor_email}</div>
                                    <p><button classname="card__btn" onClick={() => fav(el.Foodname)}> add to favorites </button></p>
                                    <div> Vendor Closed at the moment. </div>
                                </div>
                            </div >
                            <br></br>
                        </div>
                    })}
            </p>
            <h2> Favorites </h2>
            <div>
                {favorites.map(el => {
                    return <div>
                        <div className="card">
                            <div className="card__body">
                                <h2 className="card__title" align="left">{el}</h2>
                            </div>
                        </div >
                        <br></br>
                    </div>
                })}
            </div>

        </div >
    )
};

export default Register;

