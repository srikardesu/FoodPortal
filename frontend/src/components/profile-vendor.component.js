import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeManagername = this.onChangeManagername.bind(this);
        this.onChangeShopName = this.onChangeShopName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeContact_No = this.onChangeContact_No.bind(this);
        this.onChangeOpening_Time = this.onChangeOpening_Time.bind(this);
        this.onChangeClosing_Time = this.onChangeClosing_Time.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
            Managername: 'abc',
            ShopName: '',
            Email: '',
            Password: '',
            Contact_No: '',
            Opening_Time: '',
            Closing_Time: ''
        }
        // window.location.reload();
    }

    componentDidMount() {
        let id = sessionStorage.getItem("id");
        let url = "/api/vendor/" + id;
        axios.get(url)
            .then((res) => {
                this.setState({
                    Managername: res.data.Managername,
                    ShopName: res.data.ShopName,
                    Email: res.data.Email,
                    Password: res.data.Password,
                    Contact_No: res.data.Contact_No,
                    Opening_Time: res.data.Opening_Time,
                    Closing_Time: res.data.Closing_Time
                })
            })
            .catch((err) => {
                alert('Somethings wrong!');
            });
    }

    onChangeManagername(e) {
        this.setState({
            Managername: e.target.value
        })
    }

    onChangeShopName(e) {
        this.setState({
            ShopName: e.target.value
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

    onChangeOpening_Time(e) {
        this.setState({
            Opening_Time: e.target.value
        })
    }

    onChangeClosing_Time(e) {
        this.setState({
            Closing_Time: e.target.value
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let user = this.state;
        console.log(user);
        let id = sessionStorage.getItem("id");
        let url = "/api/vendor/update/" + id;
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
                    Managername: 'abc',
                    ShopName: '',
                    Email: '',
                    Password: '',
                    Contact_No: '',
                    Opening_Time: '',
                    Closing_Time: ''
                })
            });
    }

    render() {
        return (
            <div>
                <h3>Profile Page</h3>
                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label>Manager Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Managername}
                            onChange={this.onChangeManagername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Shop Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ShopName}
                            onChange={this.onChangeShopName}
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
                        <label>Opening Time: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Opening_Time}
                            onChange={this.onChangeOpening_Time}
                        />
                    </div>
                    <div className="form-group">
                        <label>Closing Time: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.Closing_Time}
                            onChange={this.onChangeClosing_Time}
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