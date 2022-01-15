import * as config from '../config/UserEndpoints'

export const SHOW_USERLIST = 'SHOW_USERLIST';
export const HIDE_USERLIST = 'HIDE_USERLIST';

export const GET_USER = 'GET_USER'
export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const EDIT_USER = 'EDIT_USER';

export const SHOW_USERFORM = 'SHOW_USERFORM';

export const GET_USER_ERROR = 'GET_USER_ERROR';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const EDIT_USER_FORM = 'EDIT_USER_FORM';
export const HIDE_EDIT_USER_FORM = 'HIDE_EDIT_USER_FORM';


export function showUserFormAction(){
    return {
        type: SHOW_USERFORM
    }
}


export function getUserListAction(userList){
    return {
        type: SHOW_USERLIST,
        users: userList.users
    }
}

export function getUserListErrorAction(error){
    return {
        type: HIDE_USERLIST,
        error: error
    }
}

export function getUserAction(userData){
    return {
        type: GET_USER,
        foundUser: userData.foundUser
    }
}

export function getUserErrorAction(userData){
    return {
        type: GET_USER_ERROR,
        foundUser: userData.foundUser
    }
}

export function addUserAction(userData){
    return {
        type: ADD_USER,
        newUser: userData.newUser
    }
}

export function addUserErrorAction(){
    return {
        type: ADD_USER_ERROR
    }
}

export function deleteUserAction(){
    return {
        type: DELETE_USER
    }
}

export function editUserAction(userData){
    return {
        type: EDIT_USER,
        foundUser: userData.foundUser
    }
}

export function editUserErrorAction(user){
    return {
        type: EDIT_USER_ERROR
    }
}

export function editUserFormAction(){
    return {
        type: EDIT_USER_FORM
    }
}

export function hideEditUserFormAction(){
    return {
        type: HIDE_EDIT_USER_FORM
    }
}

export function deleteUserErrorAction(user){
    return {
        type: DELETE_USER_ERROR,
        user: null
    }
}

//Fetch

function fetchData(requestOptions, url, handleResponse){
    return fetch(url, requestOptions)
    .then(handleResponse)
    .then(result => {return result})
    .catch(err => {
        console.log(err)
    })
}

//getUserList

export function getUserList(accessToken){
    console.log("get Userlist when admin logged in");
    return dispatch => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + accessToken
            }
        }
        const url= config.GET_USER_LIST;
        fetchData(requestOptions, url, handleResponseUserList)
        //fetchList(accessToken)
        .then(
            userList => {
                const action = getUserListAction(userList);
                dispatch(action);
            },
            error => {
                console.log("Error: " + error)
                dispatch(getUserListErrorAction(error));
            }
        )
    }
}

function handleResponseUserList(response, next){
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok){
            if (response.status === 401){
                console.log("Reponse Status 401");
            }
           
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let userList = {
            users: data
        }
        return userList;
    })
}

//find existing User
export function findUser(data, accessToken){
    return dispatch => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            },
            body: JSON.stringify(data)
        }
        const id = data.userID
        const url = config.FIND_USER + id
        fetchData(requestOptions, url, handleResponseFindUser)
        .then(
            user => {
                const action = getUserAction(user);
                dispatch(action);
            },
            error => {
                console.log("Error: " + error)
                dispatch(getUserErrorAction(error));
            }
        )
    }
}

function handleResponseFindUser(response, next){
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        console.log("Data: " + data)

        if (!response.ok && response == undefined){
            if (response.status === 401){
                console.log("Reponse Status 401");
            }
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let userData = {
            foundUser: data
        }
        console.log(JSON.stringify(userData))
        return userData;
    })
}

//addUser
export function addUser(data, accessToken){
    return dispatch => {
        fetchAddUser(data, accessToken)
        .then(
            (user, error) => {
                if (user == undefined){
                    console.log("ERROR: " + error)
                    dispatch(addUserErrorAction(error))
                }
                else{
                    console.log("Neuer User: " + JSON.stringify(user))
                    const action = addUserAction(user);
                    dispatch(action);
                }
            },
            error => {
                console.log("No user: " + error)
                dispatch(addUserErrorAction(error));
            }
        )
        .catch(error => {
            dispatch(addUserErrorAction(error))
        })
    }
}


function fetchAddUser(data, accessToken){
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + accessToken
        },
        body: JSON.stringify(data)
    }
    return fetch(config.ADD_USER, requestOptions)
    .then(handleResponseAddUser)
    .then((user, err) => {
        if (user){
            return user
        }
        if (err){
            return err
        }
    })
    .catch(err => {
        console.log("Error: " + err)
    })
}

function handleResponseAddUser(response, next){
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        console.log("Data: " + data)

        if (!response.ok && response == undefined){
            if (response.status === 401){
                console.log("Reponse Status 401");
            }
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let userData = {
            newUser: data
        }
        console.log(JSON.stringify(userData))
        return userData;
    })
}


//removeUser
export function deleteUser(userID, accessToken){
    console.log("remove user");
    return dispatch => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            },
            body : JSON.stringify({userID : userID})

        }
        const url= config.DELETE_USER;
        return fetch(url, requestOptions)
        .then(response => {
            console.log(JSON.stringify(response))
            const action = deleteUserAction(response);
            dispatch(action);
        })
        .catch(error => {
            console.log(error)
            dispatch(deleteUserErrorAction(error));
        })
    }
}



//editUser

export function editUser(data, accessToken){
    console.log("edit user");
    return dispatch => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + accessToken
            },
            body: JSON.stringify(data)
        }
        const url= config.EDIT_USER + data.userID;
        console.log("reqops: " + JSON.stringify(requestOptions))
        fetchData(requestOptions, url, handleResponseEditUser)
        .then(
            userData => {
                console.log("I got the user: " + JSON.stringify(userData))
                const action = editUserAction(userData);
                dispatch(action);
            },
            error => {
                console.log("Didnt get user")
                dispatch(editUserErrorAction(error));
            }
        )
    }

}

function handleResponseEditUser(response, next){
    //text(): nimmt response Stream, liest zum Ende, gibt Promise zurück
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        console.log("Data: " + data)

        if (!response.ok && response == undefined){
            if (response.status === 401){
                console.log("Reponse Status 401");
            }
            const error = (data && data.message) || response.statusText;
            console.log("Error: " + error)
            return Promise.reject(error);
        }
        let userData = {
            updatedUser: data
        }
        console.log(JSON.stringify(userData))
        return userData;
    })
}