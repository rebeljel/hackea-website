import React, { Component } from "react";
import './App.css';
import TopMenu from './components/TopMenu'
import PublicPage from './components/PublicPage'
import PersonalPage from './components/PersonalPage'
import PrivatePage from './components/PrivatePage'
import AdminPage from './components/AdminPage'
import { Switch, Route } from "react-router-dom";
import Router from './helper/Router'
import {connect} from 'react-redux';


const mapStateToProps = state => {
  return state
}

class App extends Component {
  render(){

    const data = this.props.user
    var admin;
    var user;

    if (data !== undefined && data !== null){
      if (data.userID === "admin"){
        admin = data.userID;
      }
      else{
        user = data.userID;
      }
    }

    console.log("APP USER: " + JSON.stringify(this.props.user))
    return (
      <div>
        <TopMenu/>
        <Router/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);
