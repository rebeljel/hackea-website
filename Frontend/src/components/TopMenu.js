import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import '../layout/TopMenu.css';
import logo from '../layout/login/pics/logo-blue.png'
import UserSessionWidget from './UserSessionWidget'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import NotificationBell from './Buttons/NotificationBell'
import UserMenuWidget from "./Widgets/UserMenuWidget";

const mapStateToProps = state => {
  return state
}

class TopMenu extends Component {

    render() {

        const user = this.props.user
        let userGreeting;
        let logButton;
        let notify;
        let userWidget
        
        if (user){
            userWidget = <UserMenuWidget/>
            notify = <NotificationBell/>
          }
          else{
            logButton = <UserSessionWidget />
          }
          
        return (
            <Navbar 
            expand="md" 
            sticky="top"
            className="navbar navbar-light my-navbar">
                <Navbar.Brand 
                    as={Link}
                    to="/home"
                    className="d-inline-block align-top"
                    style={{marginLeft: '10px'}}>
                    <img width="90" height="40" alt="Hackea" src={logo}/>
                </Navbar.Brand>

                <Navbar.Toggle 
                aria-controls="basic-navbar-nav" aria-expanded="false" 
                className="" />

                <Navbar.Collapse id="basic-navbar-nav btn-nav order-3">
                    <Form inline
                    style={{margin:'auto'}}>
                        
                        <FormControl 
                        type="text" 
                        placeholder="Search" 
                        className="form-group has-search my-0 rounded-pill mx-auto" 
                        id="searchbar1"
                        
                        />
                    </Form>
                    {notify}
                    {userWidget}
                    {logButton}
                    
                </Navbar.Collapse>
            </Navbar>
            
        )
    }
}

export default connect(mapStateToProps)(TopMenu)