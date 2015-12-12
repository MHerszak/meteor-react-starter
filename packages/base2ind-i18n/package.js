Package.describe({
  name: "base2ind:i18n",
  summary: "Language i18n package",
  version: "0.0.1",
});

Package.onUse(function (api)
{
  api.versionsFrom('1.2.1');

  api.use(['base2ind:lib-react@0.0.1']);

  api.addFiles(['i18n.js'], ['client', 'server']);

  /*api.export([
    'i18n'
  ]);*/
});
