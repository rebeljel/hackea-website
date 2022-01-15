import React, { Component } from "react";
import { connect } from "react-redux"

import * as postActions from '../../actions/PostActions'
import { bindActionCreators } from "redux";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import CommentBox from "../Comments/CommentBox";
import CommentText from "../Comments/CommentText";
import EditPostForm from "../Formulare/EditPostForm"

import '../../layout/login/css/style.css';
import ivar from '../../layout/personal/pics/ivarhack.png'
import heart from '../../layout/personal/pics/icons/heart.png'


class EintragWidget extends Component {

    constructor(props) {
        super(props);

        //lokaler state
        this.state = {
            show: false,
            showEdit: false,
            title: '',
            content: '',
            comment: '',
            id: '',
        }

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this)
        this.handleEditClose = this.handleEditClose.bind(this)
    }

    componentDidMount() {

    }


    handleShow(e) {
        this.setState({
            show: true
        });
    }

    handleShowEdit(e) {
        this.setState({
            showEdit: true
        });
    }

    handleEditClose(e){
        this.setState({
            showEdit: false
        })
    }


    handleClose(e) {
        this.setState({
            show: false
        })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(JSON.stringify(this.state.comment))
    }



    render() {
        var show = this.state.show;
        var showEdit = this.state.showEdit

        const comments = this.props.comments

        const postId = this.props.id

        const { handleDelete } = this.props
        const { handleEdit } = this.props


        const allComments = comments
            .map((comment, index) => {
                return comment.map((c, index) => {
                    return (
                        <CommentBox
                            key={index}
                            content={c.content}
                            date={c.createdAt}
                            author={c.user.userID}
                            id={c._id}
                            postid={postId} />
                    )
                })
            })



        return (
            <div className="card my-card my-2">
                <img
                    className="hack-pic"
                    src={ivar}
                    alt=""
                    onClick={this.handleShow}
                    style={{ cursor: 'pointer' }} />
                <div className="container container-cards" >
                    <div className="d-flex bd-highlight mb-3">
                        <div className="me-auto pt-2 bd-highlight">
                            <img src="https://github.com/twbs.png" alt="Bootstrap" width="32" height="32" className="rounded-circle border border-white" />
                        </div>
                        <div className="me-auto pt-2 bd-highlight">
                            <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#geo-fill" />
                            </svg>
                            <small>{this.props.username}</small>
                        </div>
                        <div className="me-auto pt-2 bd-highlight">
                            <svg className="bi me-2" width="1em" height="1em"><use xlinkHref="#calendar3" /></svg>
                            <small>1d</small>
                        </div>
                        <div className="pt-2 bd-highlight">
                            <button className="btn btn-default mx-1 heart-icon" type="button" id="favorites1">
                                <img className="icons-black" src={heart} width="25" height="25" alt="" />
                            </button>
                        </div>
                    </div>
                    <h5
                        onClick={this.handleShow}
                        style={{ cursor: 'pointer' }}>{this.props.title}</h5>
                    <p className="text-truncate">{this.props.content}</p>

                    <small>{this.props.xButton && <Button className="btn-sm btn-reg rounded-pill" onClick={(e) => {

                        handleDelete(e, this.props.id)
                    }}>X</Button>}
                    </small>
                    <small className="m-2">{this.props.xButton && <Button className="btn-sm btn-reg rounded-pill" onClick={(e) => {

                        this.handleShowEdit(e, this.props.id)
                    }}>Edit</Button>}
                    </small>

                </div>

                <Modal
                    size='lg'
                    show={show}
                    onHide={this.handleClose}>
                    <Modal.Header>
                        <Button className="btn text-dark btn-reg rounded-pill" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col sm={7} lg={7}><Image
                                    src={ivar}
                                    rounded
                                    fluid /></Col>
                                <Col sm={5} lg={5}>{this.props.content}</Col>
                            </Row>
                            <h2 className="pb-2 border-bottom"></h2>
                            <Row>
                                <CommentText id={postId} />
                            </Row>
                            <Row>{allComments}</Row>

                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

                <Modal
                    size='lg'
                    show={showEdit}
                    onHide={this.handleEditClose}>
                    <Modal.Header>
                        <Button className="btn text-dark btn-reg rounded-pill" onClick={this.handleEditClose}>
                            Close
                        </Button>

                        <Modal.Title>{this.props.title}</Modal.Title>
                        <Modal.Title>EDIT POST</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicUserID">
                                <Form.Label>Author</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.props.username}
                                    name='userID'
                                    disabled />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={this.props.title}
                                    name='title'
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    as="textarea"
                                    rows={3}
                                    placeholder={this.props.content}
                                    name='contentarea'
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn btn-lg text-dark btn-reg rounded-pill"
                            style={{ margin: '10px', width: '30%' }}
                            //onClick={this.handleEdit}
                            type="submit"
                            id="editSubmit">Submit
                        </Button>
                        <Button
                            className="btn btn-lg text-dark btn-reg rounded-pill"
                            style={{ margin: '10px', width: '30%' }}
                            type="reset"
                            //onClick={this.handleReset}
                            id="editReset">Reset
                        </Button>

                    </Modal.Footer>
                </Modal>


            </div>
        )
    }
}

export default EintragWidget