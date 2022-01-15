const User = require('./userModel');
const bcrypt = require('bcrypt');
const { Mongoose } = require('mongoose');
const crypto = require('crypto');


function getUsers(callback) {
    User.find(function (err, users) {
        if (err) {
            console.log("Fehler bei Suche: " + err)
            return callback(err, null)
        }
        else {
            console.log("Alles super");
            return callback(null, users)
        }
    })
}



//Datensatz anlegen
function userSave(props, callback) {
    if (!props) {
        console.log("Error: there is no json body")
        callback("JSON-Body missing", null);
        return;
    }
    User.findOne({ userID: props.userID })
        .exec((err, user) => {
            if (err) {
                return callback("Fehler" + err, null);
            }
            if (user) {
                //hier gibt er user zurück...
                return callback(`UserID ${props.userID} is already in use`, null);
            }
            if (props.userID == "admin") {
                var adminUser = new User();
                adminUser.userID = props.userID;
                adminUser.password = props.password;
                adminUser.userName = props.userName;
                adminUser.isAdministrator = true;
                adminUser.save(function (err) {
                    if (err) {
                        callback("Could not create to admin account", null);
                    }
                    else {
                        console.log("Admin account created")
                        callback(null, adminUser);
                    }
                });
            }
            else {
                const user = new User({
                    id: "u_" + crypto.randomBytes(3).toString('base64') + crypto.randomInt(1, 99),
                    userID: props.userID,
                    email: props.email,
                    userName: props.userName,
                    password: props.password
                });
                user.save(function (err) {
                    if (err) {
                        console.log("Could not create account: " + err);
                        callback("Could not create account", null);
                    }
                    else {
                        console.log("User Created");
                        callback(null, user);
                    }
                })
            }
        })
}


function deleteUser(props, callback) {
    console.log(`UserService: find and delete User with ID ${props.userID}`);
    if (!props) {
        console.log("Error: there is no json body")
        callback("JSON-Body missing", null);
        return;
    }
    User.findOneAndDelete({ userID: props.userID }, (err, user) => {
        if (err) {
            return callback("Error: ", null);
        }
        if (user){
            console.log("User was deleted")
            return callback(`UserID ${props.userID} is deleted`, user);
        }
        return callback(`User not in database`, null);
    })
}

//Nach ID User finden
function findUserBy(searchUserID, callback) {
    console.log("UserService: find User by ID " + searchUserID);
    //wenn keine userID angegeben
    if (!searchUserID) {
        callback("UserID is missing");
        return;
    }
    else {
        //suche nach User mit userID
        var query = User.findOne({ userID: searchUserID });
        query
            .exec(function (err, user) {
                //wenn kein User gefunden
                if (err) {
                    console.log("Did not find user for userID: " + searchUserID);
                    return callback("Did not find user for userID: " + searchUserID, null);

                }
                //user gefunden
                else {
                    //wenn die UserID gefunden wurde
                    if (user) {
                        console.log(`Found userID: ${searchUserID}`);
                        callback(null, user);
                    }
                    //wenn die userID admin ist
                    else {
                        if ('admin' == searchUserID) {
                            console.log('Do not have admin account yet. Create it with default password')
                            var adminUser = new User();
                            adminUser.userID = "admin";
                            adminUser.password = "124";
                            adminUser.userName = "Default Admin Account";
                            adminUser.isAdministrator = true;

                            adminUser.save(function (err) {
                                if (err) {
                                    console.log("Could not create default admin account: " + err);
                                    callback("Could not login to admin account", null);
                                }
                                else {
                                    callback(null, adminUser);
                                }
                            });
                        }
                        else {
                            console.log('Could not find user for user ID: ' + searchUserID)
                            callback(null, user);
                        }
                    }
                }
            })
    }
}

function updateUser(props, params, callback) {
    User.findOne({ userID: params.userID }, function (err, result) {
        if (err) {
            console.log("error in user service")
            callback(err, null)
        }
        else {
            if (result) {
                result.userName = props.userName;
                result.email = props.email;
                result.password = props.password;
                result.image = props.image;
                result.save();
                callback(null, result)
            }
            else {
                console.log("User not found... ")
                return callback(err, null)
            }
        }
    })
}

module.exports = {
    getUsers,
    findUserBy,
    userSave,
    deleteUser,
    updateUser
}