/*class AccountsUI
{
    constructor(options)
    {
        this.options = {
            requestPermissions: {},
            requestOfflineToken: {},
            forceApprovalPrompt: {}
        }

        this.VALID_KEYS = [
            'passwordSignupFields',
            'requestPermissions',
            'requestOfflineToken',
            'forceApprovalPrompt'
        ];

        _.each(_.keys(options), (key) => {
            if (!_.contains(this.VALID_KEYS, key))
                throw new Error("config: Invalid key: " + key);
        });

        _.extend(this.options,options);

        // deal with `passwordSignupFields`
        if (options.passwordSignupFields) {
            if (_.contains([
                    "USERNAME_AND_EMAIL",
                    "USERNAME_AND_OPTIONAL_EMAIL",
                    "USERNAME_ONLY",
                    "EMAIL_ONLY"
                ], options.passwordSignupFields)) {
                if (this.options.passwordSignupFields)
                    throw new Error("AccountsUI: Can't set `passwordSignupFields` more than once");
                else
                    this.options.passwordSignupFields = options.passwordSignupFields;
            } else {
                throw new Error("AccountsUI: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);
            }
        }

        // deal with `requestPermissions`
        if (options.requestPermissions) {
            _.each(options.requestPermissions, (scope, service) => {
                if (this.options.requestPermissions[service]) {
                    throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);
                } else if (!(scope instanceof Array)) {
                    throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");
                } else {
                    this.options.requestPermissions[service] = scope;
                }
            });
        }

        // deal with `requestOfflineToken`
        if (options.requestOfflineToken) {
            _.each(options.requestOfflineToken, (value, service) => {
                if (service !== 'google')
                    throw new Error("AccountsUI: `requestOfflineToken` only supported for Google login at the moment.");

                if (this.options.requestOfflineToken[service]) {
                    throw new Error("AccountsUI: Can't set `requestOfflineToken` more than once for " + service);
                } else {
                    this.options.requestOfflineToken[service] = value;
                }
            });
        }

        // deal with `forceApprovalPrompt`
        if (options.forceApprovalPrompt) {
            _.each(options.forceApprovalPrompt, (value, service) => {
                if (service !== 'google')
                    throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");

                if (this.options.forceApprovalPrompt[service]) {
                    throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);
                } else {
                    this.options.forceApprovalPrompt[service] = value;
                }
            });
        }
    }

    passwordSignupFields() {
        return this.options.passwordSignupFields || "EMAIL_ONLY";
    }

    page(element) {
        return Overlay.page(element);
    }
}*/

AccountsUI = {

    _options: {
        requestPermissions: {},
        requestOfflineToken: {},
        forceApprovalPrompt: {}
    },

    config(options) {
        // validate options keys
        const VALID_KEYS = [
            'passwordSignupFields',
            'requestPermissions',
            'requestOfflineToken',
            'forceApprovalPrompt'
        ];

        _.each(_.keys(options), (key) => {
            if (!_.contains(VALID_KEYS, key))
                throw new Error("Accounts.ui.config: Invalid key: " + key);
        });

        // deal with `passwordSignupFields`
        if (options.passwordSignupFields) {
            if (_.contains([
                    "USERNAME_AND_EMAIL",
                    "USERNAME_AND_OPTIONAL_EMAIL",
                    "USERNAME_ONLY",
                    "EMAIL_ONLY"
                ], options.passwordSignupFields)) {
                if (AccountsUI._options.passwordSignupFields)
                    throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");
                else
                    AccountsUI._options.passwordSignupFields = options.passwordSignupFields;
            } else {
                throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);
            }
        }

        // deal with `requestPermissions`
        if (options.requestPermissions) {
            _.each(options.requestPermissions, (scope, service) => {
                if (AccountsUI._options.requestPermissions[service]) {
                    throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);
                } else if (!(scope instanceof Array)) {
                    throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");
                } else {
                    AccountsUI._options.requestPermissions[service] = scope;
                }
            });
        }

        // deal with `requestOfflineToken`
        if (options.requestOfflineToken) {
            _.each(options.requestOfflineToken, (value, service) => {
                if (service !== 'google')
                    throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment.");

                if (AccountsUI._options.requestOfflineToken[service]) {
                    throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);
                } else {
                    AccountsUI._options.requestOfflineToken[service] = value;
                }
            });
        }

        // deal with `forceApprovalPrompt`
        if (options.forceApprovalPrompt) {
            _.each(options.forceApprovalPrompt, (value, service) => {
                if (service !== 'google')
                    throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");

                if (AccountsUI._options.forceApprovalPrompt[service]) {
                    throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);
                } else {
                    AccountsUI._options.forceApprovalPrompt[service] = value;
                }
            });
        }
    },

    passwordSignupFields() {
        return AccountsUI._options.passwordSignupFields || "EMAIL_ONLY";
    },

    page(element) {
        return Overlay.page(element);
    }
};
