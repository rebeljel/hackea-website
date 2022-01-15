import React, { Component } from "react";
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import * as userActions from '../../actions/UserActions'
import bell from '../../layout/personal/pics/icons/notification.png'

class NotificationBell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }

        this.handleShow = this.handleShow.bind(this);
    }

    handleShow() {
        console.log("Show Notifications Button angeklickt")
        this.setState({ show: true })
    }

    handleClose() {

    }

    render() {

        const show = this.state.show

        return (
            <div>
                <button className="btn btn-default mx-1" type="button">
                    <img src={bell} width="25" height="25" alt="*" onClick={this.handleShow}
                        style={{ marginLeft: 'auto' }} />
                </button>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteUser: userActions.deleteUser
}, dispatch)

const ConnectedUserForm = connect(mapStateToProps, mapDispatchToProps)(NotificationBell)

export default ConnectedUserForm