import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">FoodPortal</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {sessionStorage.getItem("isloggedin") == "yes" && <li className="navbar-item">
                            <Link to="/" className="nav-link">Food</Link>
                        </li>}

                        {/* {sessionStorage.getItem("isloggedin") == "yes" && <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Food Item</Link>
                        </li>} */}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Buyer" && <li className="navbar-item">
                            <Link to="/buyerorders" className="nav-link">Orders</Link>
                        </li>}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Buyer" && <li className="navbar-item">
                            <Link to="/profilebuyer" className="nav-link">Profile</Link>
                        </li>}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/profilevendor" className="nav-link">Profile</Link>
                        </li>}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Buyer" && <li className="navbar-item">
                            <Link to="/buyerdashboard" className="nav-link">Buyer Dashboard</Link>
                        </li>}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/ordersdashboard" className="nav-link">Orders Dashboard</Link>
                        </li>}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/statistics" className="nav-link">Statistics</Link>
                        </li>}
                        {sessionStorage.getItem("isloggedin") == "yes" && sessionStorage.getItem("type") == "Vendor" && <li className="navbar-item">
                            <Link to="/vendordashboard" className="nav-link">Vendor Dashboard</Link>
                        </li>}
                        {!(sessionStorage.getItem("isloggedin") == "yes") && <li className="navbar-item">
                            <Link to="/Login" className="nav-link">Login Page</Link>
                        </li>}
                        {(sessionStorage.getItem("isloggedin") == "yes") && <li className="navbar-item">
                            <Link to="/Login" className="nav-link">Logout</Link>
                        </li>}
                        {!(sessionStorage.getItem("isloggedin") == "yes") && <li className="navbar-item">
                            <Link to="/Register" className="nav-link">Registration Page</Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        );
    }
}