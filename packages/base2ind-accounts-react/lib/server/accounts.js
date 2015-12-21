/**
 * accounts-ui package configuration
 */
Accounts.config({
    sendVerificationEmail: true,
    forbidClientAccountCreation: false
});

AccountsUI.config({
    passwordSignupFields: 'EMAIL_ONLY',
});