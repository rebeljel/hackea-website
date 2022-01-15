import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";

import * as userActions from '../../actions/UserActions'


class EditUserButton extends Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        console.log("Login Button angeklickt")
        const {deleteUserAction} = this.props;
        deleteUserAction()
    }

    render(){
        return(
            <Button                     
                className="btn btn-dark btn-lg text-dark btn-lg btn-reg rounded-pill"
                style={{marginLeft: 'auto'}}
                onClick={this.handleDelete}
                >Edit
            </Button>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteUserAction: userActions.deleteUserAction
},dispatch)

const ConnectedUserForm = connect(mapStateToProps, mapDispatchToProps)(EditUserButton)

export default ConnectedUserForm