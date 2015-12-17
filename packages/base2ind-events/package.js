Package.describe({
  name: "base2ind:events",
  summary: "Base2Industries event tracking package",
  version: "0.0.1",
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'base2ind:lib-react@0.0.1',
    'base2ind:i18n@0.0.1'
  ]);

  api.addFiles([
    'lib/events.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/client/analytics.js'
  ], ['client']);

  api.export([
    'Events'
  ]);
});
