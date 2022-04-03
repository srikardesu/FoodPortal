import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangetype = this.onChangetype.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            users: [],
            email: '',
            password: '',
            type: ''
        }
        // window.location.reload();
    }

    componentDidMount() {
        this.setState({
            users: ["Vendor", "Buyer"],
            type: "Vendor",
            email: '',
            password: ''
        })
        sessionStorage.setItem("isloggedin", "no");
        sessionStorage.setItem("type", "n");
        sessionStorage.setItem("email", "no");
        sessionStorage.setItem("id", 0);
    }

    onChangetype(e) {
        this.setState({
            type: e.target.value
        })
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        })
        // console.log(this.state.email);
    }

    onChangepassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        if (this.state.type == "Vendor") {
            let user = this.state;
            axios.post("/api/vendor/login", user)
                .then((res) => {
                    sessionStorage.setItem("type", "Vendor");
                    sessionStorage.setItem("isloggedin", "yes");
                    sessionStorage.setItem("email", res.data.Email);
                    sessionStorage.setItem("id", res.data._id);
                    
                    this.props.history.push('/profilevendor');
                    window.location.reload();
                })
                .catch((err) => {
                    alert('Incorrect Email/Password');
                    this.setState({
                        users: ["Vendor", "Buyer"],
                        type: "Vendor",
                        email: '',
                        password: ''
                    })
                });
        }
        else if (this.state.type == "Buyer") {
            let user = this.state;
            console.log(user);
            axios.post("/api/buyer/login", user)
                .then((res) => {
                    sessionStorage.setItem("type", "Buyer");
                    sessionStorage.setItem("isloggedin", "yes");
                    sessionStorage.setItem("email", res.data.Email);
                    sessionStorage.setItem("id", res.data._id);
                    // sessionStorage.setItem("Buyername", res.data.Buyername);
                    // sessionStorage.setItem("BuyerEmail", res.data.Email);
                    // sessionStorage.setItem("BuyerPassword", res.data.Password);
                    // sessionStorage.setItem("BuyerContact_No", res.data.Contact_No);
                    // sessionStorage.setItem("Age", res.data.Age);
                    // sessionStorage.setItem("Batch_Name", res.data.Batch_Name);


                    this.props.history.push('/profilebuyer');
                    window.location.reload();
                })
                .catch((err) => {
                    alert('Incorrect Email/Password');
                    this.setState({
                        users: ["Vendor", "Buyer"],
                        type: "Vendor",
                        email: '',
                        password: ''
                    })
                });
        }
        else {
            this.state.type = "";
            this.props.history.push('/Login');
        }
    }

    render() {
        return (
            <div>
                <h3>Login Page</h3>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label>Type: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.type}
                            onChange={this.onChangetype}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeemail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangepassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}