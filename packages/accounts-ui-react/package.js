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
        'components/combo-box.jsx',
        'components/error-messages.jsx',
        'components/logged-in.jsx',
        'components/login-box.jsx',
        'components/login-form.jsx',
        'components/oauth-button.jsx',
        'components/password-form.jsx',
        'components/register-box.jsx',
        'components/register-form.jsx',
        'components/reset-password-box.jsx',
        'i18n/en.i18n.json',
        'i18n/ru.i18n.json',
    ]);

    api.addFiles([
        './lib/routes.jsx',
    ],['client']);
});
