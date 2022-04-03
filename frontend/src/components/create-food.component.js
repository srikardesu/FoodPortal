import React, { Component } from 'react';
import axios from 'axios';

export default class CreateFood extends Component {
    constructor(props) {
        super(props);
        this.onChangeFoodname = this.onChangeFoodname.bind(this);
        this.onChangeVeg = this.onChangeVeg.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeaddons = this.onChangeaddons.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Foodname: 'abcd',
            Veg: '',
            Price: '0',
            addons: [],
            Rating: 0,
            Tags: [],
        }
    }

    onChangeFoodname(e) {
        this.setState({
            Foodname: e.target.value
        })
    }

    onChangeVeg(e) {
        this.setState({
            Veg: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            Price: e.target.value
        })
    }

    onChangeaddons(e) {
        this.setState({
            addons: e.target.value
        })
    }

    onChangeRating(e) {
        this.setState({
            Rating: e.target.value
        })
    }

    onChangeTags(e) {
        this.setState({
            Tags: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            Foodname: this.state.Foodname,
            Veg: this.state.Veg,
            Price: this.state.Price,
            addons: this.state.addons,
            Rating: this.state.Rating,
            Tags: this.state.Tags,
        }

        console.log(user);

        axios.post('/api/food/add', user)
            .then(res => console.log(res.data));

        this.state = {
            Foodname: 'abcd',
            Veg: '',
            Price: '0',
            addons: [],
            Rating: 0,
            Tags: [],
        }
    }

    render() {
        return (
            <div>
                <h3>Create New Food Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}