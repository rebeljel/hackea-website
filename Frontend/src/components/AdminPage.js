import React, { Component } from "react";
import '../layout/login/css/style.css';
import pen from '../layout/personal/pics/icons/pen.png'

import * as userActions from '../actions/UserActions'
import { bindActionCreators } from "redux";

import UserTableApp from './UserTable/UserTableApp'
import UserForm from './Formulare/UserForm'
import PostContainer from './Posts/PostContainer'
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';


const mapStateToProps = state => {
  return state
}

class AdminPage extends Component {

  componentDidMount(){
    var token = this.props.accessToken
    const {getUserList} = this.props;
    getUserList(token);
  }

  handleUserList = e =>{
    var token = this.props.accessToken
    e.preventDefault();
    const {getUserList} = this.props;
    getUserList(token);
  }

  handleShowForm = e => {
    e.preventDefault();
    const {showUserForm} = this.props;
    showUserForm();
  }

  render() {
    const user = this.props.user
    const users = this.props.users
    const showForm = this.props.showForm
    const showList = this.props.showList

    var result;

    if (showList){
      result = <UserTableApp/>
    }
    if (showForm){
      result = <UserForm/>
    }


    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col col-md-3 col-5">
              <div className="container-fluid my-profile">
                <div className="avatar-flip">
                  <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" height="100" width="100" alt="*" />
                </div>
                <h3>{user.userName}</h3>
                <p>@{user.userID}</p>
                <p>Du folgst: 20</p>
                <span><b>Follower: 13</b></span>
              </div>
            </div>
            <div className="col col-md-6 col-7">
              <div className="my-4" style={{ textAlign: "left" }}>
                <h4>User Management <button className="btn btn-default" type="button">
                  <img src={pen} width="20" height="20" alt="Bild" />
                </button>
                </h4>
                
                <Button variant="outline-dark" className = "btn-lg rounded-pill mx-1 my-2" onClick= {this.handleUserList}>Get Users</Button>
                <Button variant="outline-dark" className = "btn-lg rounded-pill my-2" onClick= {this.handleShowForm}>Add User</Button>

                
                <h2 className="pb-2 border-bottom"></h2>
              </div>
              {result}
              <div className="container my-2" style={{ textAlign: "left" }}>
              
              </div>
            </div>
          </div>
        </div>
        

        <div className="container-fluid my-container-cards mx-auto">

          
        <PostContainer user={user}/>
          <h2 className="pb-2 border-bottom"></h2>

          
        </div>


        
      </div>

    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserList: userActions.getUserList,
  showUserForm: userActions.showUserFormAction
},dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
