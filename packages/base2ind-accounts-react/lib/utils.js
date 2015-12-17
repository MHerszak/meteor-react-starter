/**
 * Resets an user's password and send him an email with a link for him to set his new password.
 * @param email
 */
Users.ForgotPassword = function ForgotPassword(email)
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
Users.SetPassword = function SetPassword(userId, newPassword)
{
    Accounts.setPassword(userId, newPassword);
}