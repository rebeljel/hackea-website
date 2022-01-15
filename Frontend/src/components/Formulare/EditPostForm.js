import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { bindActionCreators } from "redux";
import { connect } from "react-redux"

import Modal from 'react-bootstrap/Modal'


import * as postActions from '../../actions/PostActions'


class EditPostForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: "",
            content: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange(e){
        const {name, value} = e.target;
        //name von e.target, value von e.target
        this.setState({[name] : value}); 
        //console.log(this.state)
    }

    handleSubmit(e){
        e.preventDefault();
        var token = this.props.accessToken
        //methode addUser aus userActions
        const {addUser} = this.props;
        const data = this.state
        addUser(data, token)
        
        console.log(JSON.stringify(this.props.showSuccess))
    }


    render(){

        const showSuccess = this.props.showSuccess;

        var users = this.props.users;
        var success = this.props.showSuccessDelete;
        var editUser = this.props.editUserForm;


       /**  if (success){
            var token = this.props.accessToken
            const {getUserList} = this.props;
            getUserList(token);
        }**/

        if (editUser === undefined){
            editUser = false;
        }

        const {id, userID, userName, email} = this.state
        
        var result;
        if (showSuccess){
            result = <div>Successfully registered user</div>
        }
        if (!showSuccess){
            result = <div>Something went wrong</div>
        }
        if (showSuccess == undefined){
            result = null;
        }

        

        return(
        <Modal onHide={this.handleClose}>
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
        )
    }
    
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getEditPost: postActions.editPost
},dispatch)

const ConnectedPostForm = connect(mapStateToProps, mapDispatchToProps)(EditPostForm)

export default ConnectedPostForm