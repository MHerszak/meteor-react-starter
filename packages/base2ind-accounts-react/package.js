Package.describe({
    name: 'base2ind:base2ind-accounts-react',
    version: '0.0.1',
    summary: 'Internal accounts system for starter package',
    documentation: 'README.md',
});

Package.onUse(function (api)
{
    api.versionsFrom('1.2.1');

    var packages = [
        'base2ind:core-react@0.0.1', // no dependencies
    ];

    api.use(packages);

    api.addFiles([
        './utils.js',
        './lib/utils.js',
        './lib/namespace.js',
        './lib/components/error-messages.jsx',
        './lib/components/logged-in.jsx',
        './lib/components/login-wrapper.jsx',
        './lib/components/login-form.jsx',
        './lib/components/oauth-button.jsx',
        './lib/components/password-form.jsx',
        './lib/components/register-wrapper.jsx',
        './lib/components/register-form.jsx',
        './lib/components/reset-password-wrapper.jsx',

        './lib/menu.js'
    ],['client']);

    api.addFiles([
        './lib/routes.jsx',
    ],['client','server']);

    api.addFiles([
        './lib/server/accounts-config.js',
    ],['server']);

    var languages = ["en"];
    var languagesPaths = languages.map(function (language) {
        return "./i18n/"+language+".i18n.json";
    });
    api.addFiles(languagesPaths, ["client", "server"]);
});
