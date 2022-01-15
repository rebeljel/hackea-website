import React, { Component } from "react";
import { connect } from "react-redux"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import * as commentActions from '../../actions/CommentActions'
import * as postActions from '../../actions/PostActions'
import { bindActionCreators } from "redux";

class CommentText extends Component {

    constructor(props){
        super(props)

        this.state={
            content : '',
            success : false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }


    handleChange(e){
        const {name, value} = e.target;
        this.setState({[name] : value});
        console.log(JSON.stringify(this.state.comment))
    }

    handleSubmit(e){
        const post = this.props.id
        const user = this.props.user._id
        const token = this.props.accessToken

        const {comment} = this.state
        const {getCreateComment} = this.props

        getCreateComment(post, user, token, comment)
        this.setState({success : true})
    }


    render() {

        var result;
        if (this.state.success){
            result = <h5>Kommentar erfolgreich verfasst</h5>
        }

        if (this.props.postReload){
            const { getPostsAction } = this.props;
            getPostsAction();
        }

        return (
            <Col>
                <Form.Group>
                    <Form.Control as="textarea" onChange={this.handleChange} rows={3} type="text" name="comment" placeholder="Kommentar schreiben..." />
                </Form.Group>
                <Button className="btn text-dark btn-lg btn-reg rounded-pill m-auto my-2" onClick={this.handleSubmit}>
                    Absenden
                </Button>
                {result}
            </Col>
        )
    }

}

const mapStateToProps = state => {
    return state
}

//mapDispatchToProps: 

const mapDispatchToProps = dispatch => bindActionCreators({
    getCreateComment: commentActions.createComment,
    getPostsAction: postActions.getPosts
}, dispatch)

const ConnectedCommentText = connect(mapStateToProps, mapDispatchToProps)(CommentText)

export default ConnectedCommentText