import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { bindActionCreators } from "redux";
import { connect } from "react-redux"

import * as userActions from '../../actions/UserActions'


class UserForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            userID: "",
            userName: "",
            email: "",
            password: ""
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
        const {addUser} = this.props;
        const data = this.state
        console.log(JSON.stringify(this.props))
        addUser(data, token)
    }


    render(){

        const showSuccess = this.props.showSuccess;
        const showForm = this.props.showForm
        
        var result;
        if (showSuccess){
            result = <div>Successfully registered user</div>
            var token = this.props.accessToken
            if (!showForm){
                const {getUserList} = this.props;
                setInterval(getUserList(token), 3000)
            }
            
        }
        if (!showSuccess){
            result = <div>Something went wrong</div>
        }
        if (showSuccess == undefined){
            result = null;
        }

        return(
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Email" onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="userID">
                    <Form.Label>UserID</Form.Label>
                    <Form.Control name="userID" type="text" placeholder="UserID" onChange={this.handleChange} />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control name="userName" type="text" placeholder="Full Name" onChange={this.handleChange} />
                </Form.Group>
                <Button variant="btn btn-secondary btn-lg rounded-pill m-2" type="submit" onClick={this.handleSubmit}>
                    Submit
                </Button>
                <Button variant="btn btn-secondary btn-lg rounded-pill m-2" type="reset">
                    Reset
                </Button>
                { result }
                </Form>
        )
    }
    
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addUser: userActions.addUser,
    getUserList: userActions.getUserList
},dispatch)

const ConnectedUserForm = connect(mapStateToProps, mapDispatchToProps)(UserForm)

export default ConnectedUserForm