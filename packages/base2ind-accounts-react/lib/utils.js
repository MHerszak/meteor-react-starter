/**
 * Resets an user's password and send him an email with a link for him to set his new password.
 * @param email
 */
Users.forgotPassword = function forgotPassword(email)
{
    var user = Meteor.users.findOne({email: email});
    if (user == null)
        throw new Error("No user was found for the given email");
    Accounts.sendResetPasswordEmail(user._id, email);
}

/**
 * Change the user's old password for a new one.
 * @param oldPassword The user's old password.
 * @param newPassword The user's new password that will replace the old one.
 * @param callback A function callback to be executed after the password is changed. Optional.
 */
Users.ChangePassword = function ChangePassword(oldPassword, newPassword,callback)
{
    if (Meteor.user() == null)
        throw new Error("You need to be logged in to be able to perform this operation");

    Accounts.changePassword(oldPassword, newPassword,callback);
}

/**
 * Assigns a password to a user.
 * @param userId The user id.
 * @param newPassword The password that will be set.
 */
Users.setPassword = function setPassword(userId, newPassword)
{
    Accounts.setPassword(userId, newPassword);
}

Users.loginWithPassword = function loginWithPassword(user, password, callback) {
    if ( Base2Ind.utils.isFunction(callback) ) {
        Meteor.loginWithPassword(user, password, function(err) {
            if (err) {
                callback(err);
            } else {
                let uid = Meteor.userId();
                callback(uid);
            }
        });
    } else {
        var promise = new Promise (function(resolve,reject) {
            Meteor.loginWithPassword(user, password, function(err) {
                if (err) {
                    reject(err);
                } else {
                    let uid = Meteor.userId();
                    resolve(uid);
                }
            });
        });
        return promise;
    } // end if
} // end function

/**
 * Login with your facebook credentials
 * @param options
 * @param callback
 * @returns {Promise}
 * @constructor
 */
Users.loginWithFacebook = function loginWithFacebook(options, callback) {
    if ( Base2Ind.utils.isFunction(callback) ) {
        Meteor.loginWithFacebook(options, function(err) {
            if (err) {
                callback(err);
            } else {
                let uid = Meteor.userId();
                callback(uid);
            }
        });
    } else {
        var promise = new Promise (function(resolve,reject) {
            Meteor.loginWithFacebook(options, function(err) {
                if (err) {
                    reject(err);
                } else {
                    let uid = Meteor.userId();
                    resolve(uid);
                }
            });
        });
        return promise;
    } // end if
} // end function

Users.logout = function logout(callback) {
    if (Base2Ind.utils.isFunction(callback)) {
        Meteor.logout(callback);
    } else {
        var promise = new Promise( function (resolve, reject) {
            Meteor.logout( function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return promise;
    } // end if
} // end function

/**
 * Create new users.
 * @param credential
 * @param callback
 * @returns {Promise}
 */
Users.createUser = function createUser(credential, callback) {

    // validate credential
    if (!credential) {
        console.error('Error : require credential');
        return;
    }

    if (Base2Ind.utils.isFunction(callback))
    {
        Accounts.createUser(credential, function(err){
            if (err) {
                callback(err);
            } else {
                let uid = Meteor.userId();
                callback(uid);
            }
        });
    } else {
        var promise = new Promise (function(resolve,reject) {
            Accounts.createUser(credential, function(err) {
                if (err) {
                    reject(err);
                } else {
                    let uid = Meteor.userId();
                    resolve(uid);
                }
            });
        });
        return promise;
    } // end if

} // end function