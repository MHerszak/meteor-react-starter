Package.describe({
    name: 'base2ind:accounts-ui-react',
    version: '0.0.1',
    summary: 'Internal accounts system for starter package',
    documentation: 'README.md',
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');

    var packages = [
        'base2ind:core-react@0.0.1', // no dependencies
    ];

    api.use(packages);

    api.addFiles([
        'utils.js',
        './lib/components/combo-box.jsx',
        './lib/components/error-messages.jsx',
        './lib/components/logged-in.jsx',
        './lib/components/login-box.jsx',
        './lib/components/login-form.jsx',
        './lib/components/oauth-button.jsx',
        './lib/components/password-form.jsx',
        './lib/components/register-box.jsx',
        './lib/components/register-form.jsx',
        './lib/components/reset-password-box.jsx',
    ],['client']);

    api.addFiles([
        './lib/routes.jsx',
    ],['client']);

    var languages = ["en"];
    var languagesPaths = languages.map(function (language) {
        return "./i18n/"+language+".i18n.json";
    });
    api.addFiles(languagesPaths, ["client", "server"]);
});
