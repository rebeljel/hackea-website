import { connect } from 'react-redux';
import React, { Component } from "react";
import '../../layout/login/css/style.css';
import pen from '../../layout/personal/pics/icons/pen.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import * as dt from '../../helper/DateTime'
import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'

import { bindActionCreators } from "redux";

class UserWidget extends Component {

    constructor(props) {
        super(props);

        //lokaler state
        this.state = {
            text: '',
            penClick: false,
            showComments: false,
            showStart: true,
        }

        //bind this in constructor
        this.handleEdit = this.handleEdit.bind(this);
        this.handleStartseite = this.handleStartseite.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostComments = this.handlePostComments.bind(this)
        this.handleOpenPost = this.handleOpenPost.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        const { getPostsAction } = this.props;
        getPostsAction();
        const { removePostComments } = this.props
        removePostComments()
    }

    handleEdit(e) {
        const { name, value } = e.target;
        //name von e.target, value von e.target
        this.setState({ [name]: value });

    }

    handleSubmit(e) {
        e.preventDefault()
        const { text } = this.state;
        const { aboutMeAction } = this.props
        this.setState({ showText: true, penClick: false })
        aboutMeAction(text)
    }

    handlePostComments(e) {
        var userid = this.props.user._id
        const { getPostComments } = this.props;
        getPostComments(userid);
        this.setState({ showStart: false, showComments: true })
    }

    handleStartseite(e) {
        this.setState({ showStart: true, showComments: false })
    }

    handleAboutme(e) {
        this.setState({ showStart: false, showComments: false })
    }


    handleOpenPost(e, id) {
        const { getPost } = this.props
        getPost(id)
    }

    handleDelete(e, id) {
        const { deleteComment } = this.props
        const token = this.props.accessToken
        deleteComment(id, token)
    }




    render() {
        /*****For Messages and About me******/

        const postsByUser = this.props.userposts

        var boxx;
        var filteredPosts;

        //Filter Posts with no comments
        if (postsByUser) {
            filteredPosts = postsByUser.filter((p) => {
                return p.comments.length > 0;
            })
        }


        if (postsByUser) {
            boxx = filteredPosts.map((p, index) =>
                <Table bordered
                    responsive="lg">
                    <thead key={"thead" + index}>
                        <tr key={"tr" + index}>
                            <th key={p._id + "- " + index}>
                                <div
                                    onClick={(e) => this.handleOpenPost(e, p._id)}
                                    className="p-2"
                                    style={{ cursor: 'pointer' }}>{p.title}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody key={"tbody" + index}>
                        <tr key={index + "id"}>
                            <td key={p._id + "td"}>
                                {p.comments.map((c, index) =>
                                    <div
                                        key={c._id + ": " + index}
                                        className="commentDiv"
                                    >
                                        <div className="p-2" >
                                            <div>{dt.formatDateTime(c.createdAt)}<b>{" " + c.user.userID}</b></div>
                                            <div>{c.content}</div>
                                            <div><Button
                                                className="btn-sm btn-reg rounded-pill"
                                                onClick={(e) => this.handleDelete(e, c._id)}>X
                                            </Button>
                                            </div>
                                            <div><Button
                                                className="btn-sm btn-reg rounded-pill"
                                                onClick={(e) => this.handleEdit(e, c._id)}>Edit
                                            </Button>
                                            </div>
                                        </div>
                                    </div>)}
                            </td>

                        </tr>
                    </tbody>
                </Table>
            )
        }


        var window;
        if (postsByUser && this.state.showComments) {
            window = boxx
        }
        if (!postsByUser || this.state.showStart) {
            window = <div>Hello!</div>
        }
        const user = this.props.user
        return (

            <div className="container-fluid my-3 py-3">
                <div className="row">
                    <div className="col col-md-3 col-5">
                        <div className="container-fluid my-profile">
                            <div className="avatar-flip">
                                <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" height="100" width="100" alt="" />
                            </div>
                            <h3>{user.userName}</h3>
                            <p>@{user.userID}</p>
                            <p>Du folgst: 21</p>
                            <span><b>Follower: 13</b></span>
                        </div>
                    </div>
                    <div className="col col-md-6 col-7">
                        <Button variant="outline-dark" className="btn-sm rounded-pill mx-1 my-2" onClick={this.handleStartseite}>Startseite</Button>
                        <Button variant="outline-dark" className="btn-sm rounded-pill mx-1 my-2" onClick={this.handlePostComments}>New Comments</Button>

                        <h2 className="pb-2 border-bottom"></h2>

                        {window}

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getPostComments: postActions.getPostComments,
    removePostComments: postActions.getPostCommentsErrorAction,
    getPostsAction: postActions.getPosts,
    getPost: postActions.getPost,
    deleteComment: commentActions.deleteComment
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserWidget)