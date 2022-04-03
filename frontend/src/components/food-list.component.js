import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const Food = props => (
    <tr>
        <td>{props.f.Foodname}</td>
        <td>{props.f.Veg}</td>
        <td>{props.f.Price}</td>
        <td>{props.f.addons.addonsname}: {props.f.addons.addonsprice}</td>
        <td>{props.f.Rating}</td>
        <td>{props.f.Tags}</td>
    </tr>
)

export default class FoodList extends Component {

    constructor(props) {
        super(props);
        axios.get("/api/food/")
            .then(res => console.log(res.data));
        this.state = { foods: [] };
    }
    
    componentDidMount() {
        axios.get('/api/food/')
            .then(response => {
                this.setState({ foods: response.data });
                console.log(this.state.foods);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    FoodList() {
        return this.state.foods.map(currentfood => {
            return <Food f={currentfood} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Food List</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>FoodName</th>
                            <th>Veg/NonVeg?</th>
                            <th>Price</th>
                            <th>addons</th>
                            <th>Rating</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.FoodList()}
                    </tbody>
                </table>
            </div>
        )
    }
}