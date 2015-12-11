Package.describe({
  name: 'base2ind:lib-react',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "react-mixin": "3.0.3",
});

Package.onUse(function(api)
{
  api.versionsFrom('1.2.1');

  var packages = [
    // packages needed for all apps with react
    'ecmascript',
    'react@0.14.1_1',
    'jquery',

    // css
    'fourseven:scss@3.4.1',

    // packages needed for packages that depend on this one
    'underscore',
    // routing
    'kadira:flow-router@2.10.0',
    'kadira:react-layout@1.5.0',
    // collections schema and extended functionality
    'aldeed:simple-schema@1.4.0',
    'aldeed:collection2@2.5.0',
    // fonts
    'ixdi:material-design-iconic-font@2.1.5',

    // accounts ui
    /*'universe:modules@0.6.1',*/
    'universe:i18n@1.2.2',
    'react-meteor-data@0.2.4',
    'service-configuration',
    'accounts-base',
    'accounts-oauth',
    'accounts-password',
    'accounts-facebook',
    'accounts-ui',

    // making nmp packages work
    'cosmos:browserify',

    'kadira:dochead@1.2.2',

  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    './lib/core.jsx',
    './lib/router.js',
    './client.browserify.js',
  ],['client','server']);

  api.addFiles([
    './lib/base.jsx',
    './lib/modules.js',
    './lib/menu.js',
    './lib/bind-component.jsx',
  ],['client']);

  api.export([
    // export the namespace
    'Base2Ind',
    'ReactMixin',
  ]);

});
