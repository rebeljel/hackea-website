import React, { Component } from "react";
import '../App.css';
import PublicPage from '../components/PublicPage'
import PersonalPage from '../components/PersonalPage'
import PrivatePage from '../components/PrivatePage'
import AdminPage from '../components/AdminPage'
import TopMenu from '../components/TopMenu'
import { Switch, Redirect, Route } from "react-router-dom";

import { connect } from 'react-redux';


const mapStateToProps = state => {
    return state
}

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }

    render() {

        const data = this.props.user
        var admin;
        var user;

        if (data !== undefined && data !== null) {
            if (data.userID === "admin") {
                admin = data.userID;
            }
            else {
                user = data.userID;
            }
        }

        if (user) {
            return (
                <Switch>
                    <Redirect exact from="/" to="/login" />
                    <Route path="/" component={PersonalPage} />
                    <Route path="/login/profile" component={PrivatePage} />
                </Switch>

            )
        }
        if (admin) {
            return (
                <Switch>
                    <Route path="/" component={AdminPage} />
                    <Route path="/profile" component={AdminPage} />
                </Switch>
            )
        }
        else {
            return (
                <Switch>
                    <Route path="/" component={PublicPage} />
                    <Route path="/profile" component={PublicPage} />
                </Switch>
            )
        }
    }
}

export default connect(mapStateToProps)(App);
