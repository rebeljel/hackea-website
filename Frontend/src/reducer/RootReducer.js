import * as authenticationActions from '../actions/AuthenticationActions'
import * as userActions from '../actions/UserActions'
import * as postActions from '../actions/PostActions'
import * as commentActions from '../actions/CommentActions'

const initialState = {
    user: null,
    accessToken: null,
    loginPending: false,
    isLoggedIn: false,
    showLoginDialog: false,
    error: null,
    users: null,
    showList: null,
    showForm: null,
    successDelete: false,
    editUserForm: false,
    text: null,
    post: null,
    posts: null,
    comment: null,
    comments: null,
    postcomments: null,
    deleteSuccess: false,
    postReload: false,
    showEditPostForm: null
};


function rootReducer(state = initialState, action) {
    console.log("Bin im Reducer: " + action.type)


    switch (action.type) {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                error: null
            }
        case authenticationActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                loginPending: true,
                error: null
            }
        case authenticationActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                isLoggedIn: true,
                user: action.user,
                accessToken: action.accessToken
            }
        case authenticationActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                loginPending: false,
                error: "Username or Password not correct"
            }
        case authenticationActions.LOGOUT:
            return initialState
        case userActions.SHOW_USERLIST:
            return {
                ...state,
                users: action.users,
                showList: true,
                showForm: false,
                showSuccessDelete: false,
                showSuccess: null
            }
        case userActions.HIDE_USERLIST:
            return {
                ...state,
                users: null
            }
        case userActions.SHOW_USERFORM:
            return {
                ...state,
                userForm: true,
                newUser: false,
                showList: false,
                showForm: true,
                error: null
            }
        case userActions.ADD_USER:
            return {
                ...state,
                showSuccess: true,
                newUser: true,
                error: null
            }
        case userActions.ADD_USER_ERROR:
            return {
                ...state,
                showSuccess: false
            }
        case userActions.DELETE_USER:
            return {
                ...state,
                showSuccessDelete: true
            }
        case userActions.EDIT_USER_FORM:
            return {
                ...state,
                editUserForm: true
            }
        case userActions.HIDE_EDIT_USER_FORM:
            return {
                ...state,
                editUserForm: false
            }
        case userActions.EDIT_USER:
            return {
                ...state,
                editUserForm: false
            }
        case userActions.EDIT_USER_ERROR:
            return {
                ...state
            }
        case postActions.GET_POSTS:
            return {
                ...state,
                posts: action.posts,
                postReload: false
            }
        case postActions.CREATE_POST:
            return {
                ...state,
                successCreate: true,
                postReload: true
            }
        case postActions.DELETE_POST:
            return {
                ...state,
                postReload: true
            }
        case postActions.GET_POSTS_ERROR:
            return {
                ...state,
                error: "Can't fetch posts"
            }
        case postActions.GET_POSTS_BY_USER:
            return {
                ...state,
                userposts: action.posts
            }
        case postActions.GET_POSTS_BY_USER_ERROR:
            return {
                ...state,
                userposts: null
            }
        case postActions.SHOW_EDIT_POST:
            return {
                ...state,
                showEditPostForm: true
            }
        case commentActions.GET_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case commentActions.CREATE_COMMENT:
            return {
                ...state,
                postReload: true
            }
        case commentActions.GET_COMMENTS:
            return {
                ...state,
                comments: action.comments
            }
        case commentActions.GET_POST_COMMENTS:
            return {
                ...state,
                postcomments: action.comments
            }
        case commentActions.DELETE_COMMENT:
            return {
                ...state,
                deleteSuccess: true,
                postReload: true
            }
        default:
            return state;
    }

};

export default rootReducer;