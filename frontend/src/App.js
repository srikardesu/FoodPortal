import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css"

import Navbar from "./components/navbar.component"
import FoodList from "./components/food-list.component";
import EditFood from "./components/edit-food.component";
import CreateFood from "./components/create-food.component";
import ProfileBuyer from "./components/profile-buyer.component";
import BuyerDashboard from "./components/buyer-dashboard.component";
import VendorDashboard from "./components/vendor-dashboard.component";
import OrdersDashboard from "./components/orders-dashboard.component";
import ProfileVendor from "./components/profile-vendor.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import BuyerOrders from "./components/buyer-order.component";
import Statistics from "./components/statistics.component";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };
  }

  login = () => {
    this.setState({ isAuthenticated: true });
  }

  logout = () => {
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { isAuthenticated } = this.state;
    console.log('hi');
    console.log(isAuthenticated);
    return (
      <Router>
        <div className="container">
          <Navbar isLoggedin={isAuthenticated} />
          <br />
          <Route path="/" exact component={FoodList} />
          <Route path="/edit/:id" component={EditFood} />
          <Route path="/create" component={CreateFood} />
          <Route path="/profilebuyer" component={ProfileBuyer} />
          <Route path="/buyerdashboard" component={BuyerDashboard} />
          <Route path="/vendordashboard" component={VendorDashboard} />
          <Route path="/ordersdashboard" component={OrdersDashboard} />
          <Route path="/buyerorders" component={BuyerOrders} />
          <Route path="/profilevendor" component={ProfileVendor} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/statistics" component={Statistics} />
        </div>
      </Router>
    );
  }
}

// export default App;

// import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import Navbar from "./components/navbar.component"
// import FoodList from "./components/food-list.component";
// import EditFood from "./components/edit-food.component";
// import CreateFood from "./components/create-food.component";
// import CreateBuyer from "./components/create-buyer.component";
// import CreateVendor from "./components/create-vendor.component";

// function App() {
//   return (
//     <div className="container">
//       Hello world!
//     </div>
//   );
// }

// export default App;
