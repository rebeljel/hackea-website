import * as config from '../config/CommentEndpoints'

export const GET_COMMENT = 'GET_COMMENT';
export const GET_COMMENT_ERROR = 'GET_COMMENT_ERROR';

export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

export const GET_POST_COMMENTS = 'GET_POST_COMMENTS';
export const GET_POST_COMMENTS_ERROR = 'GET_POST_COMMENTS_ERROR';

export const CREATE_COMMENT = 'GET_COMMENT';
export const CREATE_COMMENT_ERROR = 'GET_COMMENT_ERROR';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export function getCommentAction(commentData){
    return {
        type: GET_COMMENT,
        comment: commentData.comment
    }
}

export function getCommentErrorAction(){
    return {
        type: GET_COMMENT_ERROR
    }
}

export function getCommentsAction(commentData){
    return {
        type: GET_COMMENTS,
        comments: commentData.comment
    }
}

export function getCommentsErrorAction(){
    return {
        type: GET_COMMENTS_ERROR
    }
}

export function getAllCommentsForPostAction(commentData){
    return {
        type: GET_POST_COMMENTS,
        postcomments: commentData.comment
    }
}

export function getAllCommentsForPostErrorAction(){
    return {
        type: GET_POST_COMMENTS_ERROR
    }
}


export function createCommentAction(commentData){
    return {
        type: CREATE_COMMENT,
        comment: commentData.comment
    }
}

export function createCommentErrorAction(){
    return {
        type: CREATE_COMMENT_ERROR
    }
}

export function deleteCommentAction(){
    return {
        type: DELETE_COMMENT
    }
}

export function deleteCommentErrorAction(){
    return {
        type: DELETE_COMMENT_ERROR
    }
}


export function getComment(id){
    console.log("Get Comment")
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = config.GET_COMMENT + id;
        return fetch(url, requestOptions)
        .then(handleResponse)
        .then(commentData => {
            const action = getCommentAction(commentData);
            dispatch(action);
        })
        .catch(error => {
            console.log(error)
            dispatch(getCommentErrorAction());
        })
    }
}

export function deleteComment(id, token){
    console.log("Delete Comment")
    return dispatch => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        }
        const url = config.DELETE_COMMENT + id;
        return fetch(url, requestOptions)
        .then(comment => {
            const action = deleteCommentAction(comment);
            dispatch(action);
        })
        .catch(error => {
            console.log(error)
            dispatch(deleteCommentErrorAction());
        })
    }
}

function handleResponse(response, next){
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok && response == undefined){
            if (response.status === 401){
                console.log("Reponse Status 401");
            }
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let commentData = {
            comment: data
        }
        return commentData;
    })
}

export function getAllComments(){
    console.log("Get Comment")
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = config.GET_COMMENTS;
        return fetch(url, requestOptions)
        .then(handleResponse)
        .then(commentData => {
            const action = getCommentsAction(commentData);
            dispatch(action);
        })
        .catch(error => {
            console.log(error)
            dispatch(getCommentsErrorAction());
        })
    }
}

export function getAllCommentsForPost(postid, token){
    console.log("Get Comment")
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        }
        const url = config.GET_POST_COMMENTS + postid;
        return fetch(url, requestOptions)
        .then(handleResponse)
        .then(commentData => {
            const action = getAllCommentsForPostAction(commentData);
            dispatch(action);
        })
        .catch(error => {
            console.log(error)
            dispatch(getAllCommentsForPostErrorAction());
        })
    }
}

export function createComment(post, user, token, content){
    console.log("Create Comment")
    return dispatch => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify({user : user,
                content : content})
        }
        const url = config.CREATE_COMMENT + post
        return fetch(url, requestOptions)
        .then(handleResponseCreate)
        .then(commentData => {
            const action = createCommentAction(commentData);
            dispatch(action);
        })
        .catch(error => {
            console.log(error)
            dispatch(createCommentErrorAction());
        })
    }
}

function handleResponseCreate(response, next){
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok && response == undefined){
            if (response.status === 401){
                console.log("Reponse Status 401");
            }
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let commentData = {
            comment: data
        }
        console.log("COMMENT DATA: " + JSON.stringify(commentData))
        return commentData;
    })
}