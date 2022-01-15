import React, { Component } from "react";
import '../../layout/login/css/style.css';

import Card from 'react-bootstrap/Card'
import * as commentActions from '../../actions/CommentActions'
import * as postActions from '../../actions/PostActions'
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import * as dt from '../../helper/DateTime'

class CommentBox extends Component {

    constructor(props) {
        super(props);

        //lokaler state
        this.state = {
            
        }
    }

    componentDidMount(){
        const { getPostsAction } = this.props;
        getPostsAction();
    }

    render() {
        
        const date = dt.formatDate(this.props.date)
        const time = dt.formatTime(this.props.date)

        return (
            <div>
                <h2 className="my-3 py-2 border-bottom"></h2>
                {<Card className="commentCard" style={{ width: 'auto' , borderRadius: '25px'}}>
                    <Card.Body className="commentCard">
                        <Card.Title >{this.props.author}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text>
                           {this.props.content}
                        </Card.Text>
                        <Card.Text href="#">{date + ", " + time}</Card.Text>
                    </Card.Body>
                </Card>}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return state
}


const mapDispatchToProps = dispatch => bindActionCreators({
    getComment: commentActions.getComment,
    getPostsAction: postActions.getPosts
}, dispatch)

const ConnectedCommentBox = connect(mapStateToProps, mapDispatchToProps)(CommentBox)

export default ConnectedCommentBox