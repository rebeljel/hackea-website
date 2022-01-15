import * as config from '../config/AuthEndpoints'

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const LOGOUT = 'LOGOUT';


export function getShowLoginDialogAction(){
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction(){
    return {
        type: HIDE_LOGIN_DIALOG
    }
}


export function getAuthenticateUserPendingAction(){
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession){
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}


export function getAuthenticationErrorAction(error){
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function getLogout(){
    return{
        type: LOGOUT,
        user: null,
        accessToken: null
    }

}

export function authenticateUser(userID, password){
    console.log("Authenticate");
    return dispatch => {
        dispatch(getAuthenticateUserPendingAction());
        login(userID, password)
        .then(
            userSession => {
                const action = getAuthenticationSuccessAction(userSession);
                dispatch(action);
            },
            error => {
                dispatch(getAuthenticationErrorAction(error));
            }
        )
        .catch(error => {
            dispatch(getAuthenticationErrorAction(error))
        })
        
    }
}

function login(userID, password){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization' : 'Basic ' + btoa(userID + ':' + password)
        }
    }
    return fetch(config.LOGIN, requestOptions)
    .then(handleResponse)
    .then(userSession => {
        return userSession
    })
    .catch(err => {
        console.log(err)
    })
}

function handleResponse(response){
    const authorizationHeader = response.headers.get('Authorization');
   
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        
        var token
        if(authorizationHeader)
        {
            token = authorizationHeader.split(" ")[1];
        }
        if (!response.ok){
            if (response.status === 401){
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                user: data,
                accessToken: token
            }
            console.log(JSON.stringify(userSession))
            return userSession;
        }
    })
}

export function logout(){
    console.log('Should log out user')
    return dispatch => {
        dispatch(getLogout());
    }
}