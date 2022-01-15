import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux'
import { bindActionCreators } from "redux";

import * as userActions from '../../actions/UserActions'


class DeleteUserButton extends Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(){
        console.log("Delete User Button angeklickt")
        const {deleteUser} = this.props;
        var token = this.props.accessToken
        //var data = this.props.userData
        deleteUser(token)
        
    }

    render(){
        return(
            <Button                     
                className="btn btn-dark btn-lg text-dark btn-lg btn-reg rounded-pill"
                style={{marginLeft: 'auto'}}
                onClick={this.handleDelete}
                >Delete
            </Button>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteUser: userActions.deleteUser
},dispatch)

const ConnectedUserForm = connect(mapStateToProps, mapDispatchToProps)(DeleteUserButton)

export default ConnectedUserForm