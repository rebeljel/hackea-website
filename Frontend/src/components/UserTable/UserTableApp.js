import React, { Component } from "react";
import UserTable from "./UserTable"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import * as userActions from '../../actions/UserActions'
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return state
  }  

class UserTableApp extends Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);

        //lokaler state
        this.state = { 
        }


    }

    //der gerade ausgewählte User wird in den lokalen State geladen, Modal Form wird geöffnet
    userEdit = user => {
        const newState = Object.assign(this.state, user)
        const {getEditUserForm} = this.props;
        getEditUserForm();
    }

    //Modal Form wird geschlossen 
    handleClose(e){
        const {getHideEditUserForm} = this.props;
        console.log("hide: " + JSON.stringify(getHideEditUserForm))
        getHideEditUserForm();
    }

    //Daten vom Modal in den State übernommen
    handleChange(e){
        const {name, value} = e.target;
        //name von e.target, value von e.target
        this.setState({[name] : value}); 
    }

    handleSubmit(e){
        e.preventDefault();
        const data = this.state;
        const token = this.props.accessToken;
        const {getEditUser} = this.props;
        getEditUser(data, token)
    }

    userDelete = userID => {
        const accessToken = this.props.accessToken;
        const {getDeleteUser} = this.props;
        getDeleteUser(userID, accessToken);
    }

    render(){
        var users = this.props.users;
        var success = this.props.showSuccessDelete;
        var editUser = this.props.editUserForm;


        if (success){
            var token = this.props.accessToken
            const {getUserList} = this.props;
            getUserList(token);
        }

        if (editUser === undefined){
            editUser = false;
        }

        const {id, userID, userName, email} = this.state

        return (
            <div>
                <UserTable 
                userData={users} 
                userDelete={this.userDelete}
                userEdit={this.userEdit}/>

                <Modal show={editUser} onHide={this.handleClose}>
                    <Modal.Header>
                        <Button className="btn text-dark btn-reg rounded-pill" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-title text-center">
                            <h4>Edit User </h4>
                        </div>
                        <Form>
                        <Form.Group controlId="formBasicUserID">
                            <Form.Label>UserID</Form.Label>
                            <Form.Control 
                            type="text" 
                            value={userID}
                            name='userID' 
                            disabled/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="*****" 
                            name='password' 
                            onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder={email}
                            name='email' 
                            onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder={userName}
                            name='userName' 
                            onChange={this.handleChange}/>
                        </Form.Group>
                        </Form>
                    <Modal.Footer>
                        <Button 
                            className="btn btn-lg text-dark btn-reg rounded-pill"
                            style={{margin: '10px', width: '30%'}}
                            onClick={this.handleSubmit}
                            type="submit"
                            id="editSubmit">Submit
                        </Button>
                        <Button 
                            className="btn btn-lg text-dark btn-reg rounded-pill"
                            style={{margin: '10px', width: '30%'}}
                            type="reset"
                            onClick={this.handleReset}
                            id="editReset">Reset
                        </Button>
                    </Modal.Footer>
                    </Modal.Body>
                </Modal>
            </div>
            
        )
    }
}


//mapDispatchToProps: 

const mapDispatchToProps = dispatch => bindActionCreators({
    getDeleteUser: userActions.deleteUser,
    getUserList: userActions.getUserList,
    getEditUserForm: userActions.editUserFormAction,
    getHideEditUserForm: userActions.hideEditUserFormAction,
    getEditUser: userActions.editUser
},dispatch)

const ConnectedUserTable = connect(mapStateToProps, mapDispatchToProps)(UserTableApp)

export default ConnectedUserTable