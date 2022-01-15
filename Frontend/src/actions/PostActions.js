import * as config from '../config/PostEndpoints'

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';

export const GET_POSTS = 'GET_POSTS';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

export const GET_POST = 'GET_POST';
export const GET_POST_ERROR = 'GET_POST_ERROR';

export const GET_POSTS_BY_USER = 'GET_POSTS_BY_USER';
export const GET_POSTS_BY_USER_ERROR = 'GET_POSTS_BY_USER_ERROR';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

export const SHOW_EDIT_POST = 'SHOW_EDIT_POST';

export function createPostAction(response) {
    return {
        type: CREATE_POST,
        post: response
    }
}

export function createPostErrorAction() {
    return {
        type: CREATE_POST_ERROR
    }
}

export function getPostsAction(postData) {
    return {
        type: GET_POSTS,
        posts: postData.posts
    }
}

export function getPostsErrorAction() {
    return {
        type: GET_POSTS_ERROR
    }
}

export function getPostCommentsAction(postData) {
    return {
        type: GET_POSTS_BY_USER,
        posts: postData.posts
    }
}

export function getPostCommentsErrorAction() {
    return {
        type: GET_POSTS_BY_USER_ERROR
    }
}

export function getPostAction(postData) {
    return {
        type: GET_POST,
        posts: postData.posts
    }
}

export function getPostErrorAction() {
    return {
        type: GET_POST_ERROR
    }
}

export function deletePostAction(postData) {
    return {
        type: DELETE_POST,
        posts: postData.posts
    }
}

export function deletePostErrorAction() {
    return {
        type: DELETE_POST_ERROR
    }
}

export function showEditPostForm(){
    return {
        type: SHOW_EDIT_POST
    }
}

export function getPost(id) {
    console.log("Get Post with id " + id)
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = config.GET_POST + id
        console.log(url)
        return fetch(url, requestOptions)
            .then(handleResponse)
            .then(postData => {
                const action = getPostAction(postData);
                dispatch(action);
            })
            .catch(error => {
                console.log(error)
                dispatch(getPostErrorAction());
            })
    }
}

export function getPosts() {
    console.log("Get Posts")
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = config.GET_POSTS
        return fetch(url, requestOptions)
            .then(handleResponse)
            .then(postData => {
                const action = getPostsAction(postData);
                dispatch(action);
            })
            .catch(error => {
                console.log(error)
                dispatch(getPostsErrorAction());
            })
    }
}

export function createPost(data, userID, token) {
    console.log("Create Post")
    return dispatch => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }
        console.log(JSON.stringify(requestOptions))
        const url = config.CREATE_POST + userID
        console.log("URL: " + url)
        return fetch(url, requestOptions)
            .then(postData => {
                const action = createPostAction(postData);
                dispatch(action);
            })
            .catch(error => {
                console.log(error)
                dispatch(createPostErrorAction());
            })
    }
}

export function deletePost(id, token) {
    console.log("Delete Posts")
    return dispatch => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const url = config.DELETE_POST + id
        console.log(url)
        return fetch(url, requestOptions)
            .then(postData => {
                const action = deletePostAction(postData);
                dispatch(action);
            })
            .catch(error => {
                console.log(error)
                dispatch(deletePostErrorAction());
            })
    }
}

export function editPost(id, token) {
    console.log("Delete Posts")
    return dispatch => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        const url = config.DELETE_POST + id
        console.log(url)
        return fetch(url, requestOptions)
            .then(postData => {
                const action = deletePostAction(postData);
                dispatch(action);
            })
            .catch(error => {
                console.log(error)
                dispatch(deletePostErrorAction());
            })
    }
}

export function getPostComments(userid) {
    console.log("Get Posts with UserID")
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(JSON.stringify(requestOptions))
        const url = config.GET_POST_COMMENTS + userid
        console.log("URL: " + url)
        return fetch(url, requestOptions)
            .then(handleResponse)
            .then(postData => {
                //console.log("POSTS: " + JSON.stringify(postData))
                const action = getPostCommentsAction(postData);
                dispatch(action);
            })
            .catch(error => {
                console.log(error)
                dispatch(getPostCommentsErrorAction());
            })
    }
}

function handleResponse(response, next) {
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        //console.log("DATA: " + JSON.stringify(data))
        if (!response.ok && response == undefined) {
            if (response.status === 401) {
                console.log("Reponse Status 401");
            }
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let postData = {
            posts: data
        }
        return postData;
    })
}