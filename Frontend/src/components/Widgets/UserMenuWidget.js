import { connect } from 'react-redux';
import React, { Component } from "react";
import '../../layout/login/css/style.css';

import NavDropdown from 'react-bootstrap/NavDropdown'

import { logout } from '../../actions/AuthenticationActions'


class UserMenuWidget extends Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        console.log("Logout Button angeklickt")
        const dispatch = this.props.dispatch;
        dispatch(logout())
    }

    handleClick(){
        console.log(" Button angeklickt")
    }


    render() {


        const user = this.props.user


        const url = "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
        return (
            <div>
                <NavDropdown
                    title={
                        <small className="pull-left">
                            <small style={{ fontSize: "15px", margin: "10px" }}>Angemeldet als {user.userID}</small>

                            <img className="thumbnail-image"
                                src={url}
                                width="40"
                                height="40"
                                alt="user pic"
                            />

                        </small>
                    }
                    id="basic-nav-dropdown">

                    <NavDropdown.Item href='/' onClick={this.handleLogout}>
                        <i className="fa fa-sign-out"></i> Logout
                    </NavDropdown.Item>
                </NavDropdown>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(UserMenuWidget)