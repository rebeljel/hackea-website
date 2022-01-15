import React, { Component } from "react";
import { connect } from "react-redux"

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import EintragWidget from "./EintragWidget";
import UploadButton from "../Buttons/UploadButton";
import EditPostForm from "../Formulare/EditPostForm"

import pen from '../../layout/personal/pics/icons/pen.png'
import plus from '../../layout/personal/pics/icons/plus.png'

import * as postActions from '../../actions/PostActions'
import * as commentActions from '../../actions/CommentActions'
import { bindActionCreators } from "redux";


class PostContainer extends Component {

    constructor(props) {
        super(props);

        //lokaler state
        this.state = {
            penClick: false,
            show: false,
            title: '',
            content: '',
            success: false,
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        
    }

    componentDidMount() {
        const {getAllCommentsAction} = this.props;
        getAllCommentsAction();
        const { getPostsAction } = this.props;
        getPostsAction();
    }

    //Eventhandlers

    handleShow(e) {
        this.setState({
            penClick: true,
            show: true,
            success: false
        });
    }

    handleClose(e) {
        this.setState({
            penClick: false,
            show: false,
            success: false
        })
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const token = this.props.accessToken;
        const userID = this.props.user.userID;
        const { title, content, tags } = this.state;
        const data = { title, content }
        const { createPostAction } = this.props;
        createPostAction(data, userID, token)
        this.setState({ success: true, show:false });
    }


    handleDelete(e, id) {
        const {getDeletePost} = this.props
        const token = this.props.accessToken
        console.log(id)
        getDeletePost(id, token)
    }
    
    handleEdit(e, id) {
        const {showEditPostForm} = this.props
        console.log("EDIT MODAL")
        showEditPostForm();
    }

    render() {

        const user = this.props.user;

        var show = this.state.show;
        var success = this.state.success;
        var result;

        const postReload = this.props.postReload

        if (postReload){
            const {getPostsAction} = this.props
            getPostsAction()
        }

        if (success) {
            result = <h4>Post erfolgreich erstellt</h4>;
        }

        const posts = this.props.posts;

        const showEditForm = this.props.showEditPostForm

        var allPosts

        if (posts) {
            allPosts = posts.map((entry, index) => {
                return <Col key={index} xs md="3"><EintragWidget
                    key={index}
                    username={entry.user.userID}
                    title={entry.title}
                    id = {entry._id}
                    content={entry.content}
                    comments={[entry.comments]}
                    tags={[entry.tags]}
                /></Col>
            })
        }



        var userPosts

        if (posts) {
            userPosts = posts
                .filter(post => post.user.userID.includes(user.userID))
                .map((userPost, index) => {
                    return <Col key={index} xs md="3"><EintragWidget
                        key={index}
                        username={userPost.user.userID}
                        title={userPost.title}
                        id = {userPost._id}
                        content={userPost.content}
                        comments={[userPost.comments]}
                        tags={[userPost.tags]}
                        xButton = {true}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                    /></Col>
                })
        }

        var otherPosts

        if (posts) {
            otherPosts = posts
                .filter(post => !post.user.userID.includes(user.userID))
                .map((otherPost, index) => {
                    return <Col  key={index} xs md="3"><EintragWidget
                        key={index}
                        username={otherPost.user.userID}
                        title={otherPost.title}
                        id = {otherPost._id}
                        content={otherPost.content}
                        comments={[otherPost.comments]}
                        tags={[otherPost.tags]}
                    /></Col>
                })
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        {<div className="col"><h3 className="pb-2">Meine Beiträge</h3></div>}
                        <div className="col" style={{ textAlign: "right" }}>
                            <button className="btn btn-default mx-1" type="button">
                                <img src={plus} width="25" height="25" alt="*" onClick={this.handleShow} />
                            </button>
                            <button className="btn btn-default mx-1" type="button">
                                <img src={pen} width="25" height="25" alt="*" onClick={this.handleClick}/>
                            </button>
                        </div>

                    </div>

                </div>
              
                <h2 className="pb-2 border-bottom"></h2>
                <Container>
                    <Row className="justify-content-md-start">
                        {userPosts}
                    </Row>
                </Container>

                <div className="container">
                    <div className="row">
                        {<div className="col">
                            <h3 className="pb-2">Beiträge von anderen Nutzern</h3>
                            </div>}
                    </div>
                </div>

                <h2 className="pb-2 border-bottom"></h2>
                <Container>
                    <Row className="justify-content-md-start">
                        {otherPosts}
                    </Row>
                </Container>

                <h2 className="pb-2 border-bottom"></h2>

                <Modal
                    size='lg'
                    show={show}
                    onHide={this.handleClose}>
                    <Modal.Header>
                        <Button className="btn text-dark btn-reg rounded-pill" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Modal.Title>Neuer Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="postTitle">
                                <Form.Label>Titel</Form.Label>
                                <Form.Control
                                    name="title"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="z.B. IKEA Stuhl-Hack..." />
                            </Form.Group>
                            <Form.Group controlId="postText">
                                <Form.Label>Beschreibung</Form.Label>
                                <Form.Control
                                    name="content"
                                    onChange={this.handleChange}
                                    as="textarea"
                                    rows={3} />
                            </Form.Group>
                            <UploadButton />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn text-dark btn-reg rounded-pill m-2" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button className="btn text-dark btn-reg rounded-pill m-2" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                        {result}
                    </Modal.Footer>
                </Modal>
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}


const mapDispatchToProps = dispatch => bindActionCreators({
    createPostAction: postActions.createPost,
    getPostsAction: postActions.getPosts,
    getAllCommentsAction: commentActions.getAllComments,
    getDeletePost: postActions.deletePost,
    getEditPost: postActions.editPost,
    showEditPostForm: postActions.showEditPostForm
}, dispatch)

const ConnectedPostContainer = connect(mapStateToProps, mapDispatchToProps)(PostContainer)

export default ConnectedPostContainer