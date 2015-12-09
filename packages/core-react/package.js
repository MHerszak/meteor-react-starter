Package.describe({
  name: 'base2ind:core-react',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'This packages only incorporates the components.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api)
{
  api.versionsFrom('1.2.1');

  var packages = [
    'base2ind:lib-react@0.0.1', // no dependencies
    'izzilab:material-ui@0.2.3'
    //'base2ind:theme-react@0.0.1', // base2ind:lib-react
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    './lib/namespace.jsx',

  ],['client','server']);

  api.addFiles([
    './lib/client/themes/blue-theme.js',

    './lib/client/css/materialize.min.css',

    // Components scaffolding
    './lib/client/scaffolding/row.jsx',
    './lib/client/scaffolding/col.jsx',
    './lib/client/scaffolding/container.jsx',

    // view components
    './lib/client/view/home-page.jsx',

    './lib/client/layout/default-layout.jsx',

  ],['client']);

  api.addFiles([

    './routes.jsx',

  ],['client','server']);

  api.addFiles([
    './lib/server/admin/startup.js',

  ],['server']);

  api.export([
    // export the namespace
    'App'
  ],['client']);

});
