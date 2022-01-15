import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'

import {getShowLoginDialogAction} from '../../actions/AuthenticationActions'

class LoginButton extends Component{

    constructor(props){
        super(props);
        this.showLoginDialog = this.showLoginDialog.bind(this);
    }

    showLoginDialog(){
        console.log("Login Button angeklickt")
        const dispatch = this.props.dispatch;
        dispatch(getShowLoginDialogAction())
    }

    render(){
        return(
            <Button                     
                className="btn btn-dark btn-lg text-dark btn-lg btn-reg rounded-pill"
                style={{marginLeft: 'auto'}}
                onClick={this.showLoginDialog}
                >Login
            </Button>
        )
    }
}

export default connect()(LoginButton)