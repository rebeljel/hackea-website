import React, { Component } from "react";
import '../layout/login/css/style.css';
import UserWidget from './Widgets/UserWidget'
import PostContainer from './Posts/PostContainer'


import { connect } from 'react-redux';

const mapStateToProps = state => {
  return state
}

class PersonalPage extends Component {

  render() {

    const user = this.props.user

    return (
      <div>

        <UserWidget />
        <div className="container-fluid my-container-cards mx-auto">
          <PostContainer user={user} />
        </div>
      </div>

    )
  }
}

export default connect(mapStateToProps)(PersonalPage)