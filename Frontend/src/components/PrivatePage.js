import React, { Component } from "react";
import '../layout/login/css/style.css';
import PostContainer from './Posts/PostContainer'

import pen from '../layout/personal/pics/icons/pen.png'
import ivar from '../layout/personal/pics/ivarhack.png'
import heart from '../layout/personal/pics/icons/heart.png'
import { connect } from "react-redux";


class PrivatePage extends Component {
    render() {

        const user = this.props.user
        console.log("PUBLIC PAGE USER: " + JSON.stringify( this.props.user))

        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-light bg-light">
                    <div class="collapse navbar-collapse bg-light" fixed="top" style={{ top: '60px', fontSize: '13px', zIndex: "1000" }} id="navbarNav">
                        <ul class="navbar-nav mx-auto my-2">
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Wohnzimmer <span class="sr-only"></span></a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Schlafzimmer</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Küche</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Badezimmer</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Homeoffice</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Designer Hacks</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Kinderzimmer</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Designer Hacks</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Haustiere</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Deko and Wohnaccessoires</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Outdoors</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container-fluid my-container-cards mx-auto">
                    <PostContainer user={user} />
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(PrivatePage)