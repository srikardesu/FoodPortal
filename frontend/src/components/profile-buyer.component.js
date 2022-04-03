import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeBuyername = this.onChangeBuyername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeContact_No = this.onChangeContact_No.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBatch_Name = this.onChangeBatch_Name.bind(this);
        this.onChangeWallet = this.onChangeWallet.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            Buyername: 'abc',
            Email: '',
            Password: '',
            Contact_No: '',
            Age: 0,
            Batch_Name: 'UG1',
            Wallet: 0
        }
        // window.location.reload();
    }

    componentDidMount() {
        let id = sessionStorage.getItem("id");
        let url = "/api/buyer/" + id;
        axios.get(url)
            .then((res) => {
                this.setState({
                    Buyername: res.data.Buyername,
                    Email: res.data.Email,
                    Password: res.data.Password,
                    Contact_No: res.data.Contact_No,
                    Age: res.data.Age,
                    Batch_Name: res.data.Batch_Name,
                    Wallet: res.data.Wallet
                })
            })
            .catch((err) => {
                alert('Somethings wrong!');
            });
    }

    onChangeBuyername(e) {
        this.setState({
            Buyername: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            Email: e.target.value
        })
        // console.log(this.state.email);
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        })
    }

    onChangeContact_No(e) {
        this.setState({
            Contact_No: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            Age: e.target.value
        })
    }

    onChangeBatch_Name(e) {
        this.setState({
            Batch_Name: e.target.value
        })
    }

    onChangeWallet(e) {
        this.setState({
            Wallet: e.target.value
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let user = this.state;
        console.log(user);
        let id = sessionStorage.getItem("id");
        let url = "/api/buyer/update/" + id;
        axios.post(url, user)
            .then((res) => {
                alert('Edited Successfully!');
                // sessionStorage.setItem("type", "Vendor");
                // sessionStorage.setItem("isloggedin", "yes");

                // this.props.history.push('/vendor');
                // window.location.reload();
            })
            .catch((err) => {
                alert('some error :( !');
                this.setState({
                    Buyername: 'abc',
                    Email: '',
                    Password: '',
                    Contact_No: '',
                    Age: 0,
                    Batch_Name: 'UG1',
                    Wallet: 0
                })
            });
    }

    render() {
        return (
            <div>
                <h3>Profile Page</h3>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label>Buyername: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Buyername}
                            onChange={this.onChangeBuyername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.Email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact_No: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Contact_No}
                            onChange={this.onChangeContact_No}
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Age}
                            onChange={this.onChangeAge}
                        />
                    </div>
                    <div className="form-group">
                        <label>Batch Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Batch_Name}
                            onChange={this.onChangeBatch_Name}
                        />
                    </div>
                    <div className="form-group">
                        <label>Wallet: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Wallet}
                            onChange={this.onChangeWallet}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}