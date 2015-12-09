Package.describe({
  name: 'base2ind:react-search',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  var packages = [
    'base2ind:core-react@0.0.1', // base2ind:lib-react
  ];

  api.use(packages);

  api.addFiles([
      './lib/client/components/search-bar.jsx',
  ],['client']);

  api.export(['' +
  'SearchBar'
  ])
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('base2ind:react-search');
  api.addFiles('react-search-tests.js');
});
