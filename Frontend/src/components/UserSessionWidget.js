import React, { Component } from "react";
import { connect } from "react-redux"

import Loader from "react-loader-spinner";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import logo from '../layout/login/pics/logo-blue.png'

import * as authenticationActions from '../actions/AuthenticationActions'
import { bindActionCreators } from "redux";


class UserSessionWidget extends Component{

    constructor(props){
        super(props);

        //lokaler state
        this.state = { 
            username: '',
            password: '' 
        }

        //bind this in constructor
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Eventhandlers

    handleShow(e){
        e.preventDefault();
        /**this.setState({show: true})**/
        const {showLoginDialogAction} = this.props;
        console.log("props handleshow: " + JSON.stringify(this.props))
        showLoginDialogAction();
    }

    handleClose(e){
        /**this.setState({show: false})**/
        const {hideLoginDialogAction} = this.props;
        
        hideLoginDialogAction();
        console.log("props handleclose: " + JSON.stringify(this.props))
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name] : value}); 
    }

    showMessage(){
        if (this.props.loginPending){
            setInterval(() => {
                return <div>Username oder Passwort falsch</div>
            }, 1500)
        }
    }

    handleSubmit(e){
        e.preventDefault();
        //username und password vom lokalen state
        const {username, password} = this.state;

        //Rootreducer: showDialog: true, error: null
        const {authenticateUserAction} = this.props;
        //zu authenticateUser in AuthenticationActions
        authenticateUserAction(username, password)
    }

    //


    render(){


        var showDialog = this.props.showLoginDialog;
        if (showDialog === undefined){
            showDialog = false;
        }
        
        var loginPending = this.props.loginPending;
        var errorMessage = this.props.error;

        var result;

        if (errorMessage){
            result = errorMessage;
        }

        return(
            <div>
                <Button 
                    onClick={this.handleShow}          
                    className="btn text-dark btn-lg btn-reg rounded-pill ml-auto mr-2"
                    style={{marginLeft: 'auto'}}
                    id="login2">Login
                </Button>
                <Modal show={showDialog} onHide={this.handleClose}>
                    <Modal.Header>
                    <Button className="btn text-dark btn-reg rounded-pill" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-title text-center">
                        <img className="mb-3" src={logo} width="100px" alt="logo"/>
                        <h4>Willkommen bei HACKEA</h4>
                    </div>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address / Username</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Enter email or username" 
                        name='username' 
                        onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name='password' 
                        onChange={this.handleChange}/>
                    </Form.Group>
                    <Button 
                        className="btn text-dark btn-lg btn-reg rounded-pill m-auto my-2"
                        style={{margin: '10px', width: '100%'}}
                        onClick={this.handleSubmit}
                        id="login2">Login
                    </Button>
                    {loginPending ? <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> 
                    : <Form.Label/>}
                    {errorMessage}
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <a href="*">Passwort vergessen?</a>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
    
}

//mapDispatchToProps: 

const mapDispatchToProps = dispatch => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
},dispatch)

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)

export default ConnectedUserSessionWidget