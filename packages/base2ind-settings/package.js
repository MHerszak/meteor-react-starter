Package.describe({
  name: "base2ind:settings",
  summary: "Base2Industries settings package",
  version: "0.0.1",
});

Package.onUse(function(api) {
  var both = ['server', 'client'];

  api.versionsFrom(['METEOR@1.0']);

  api.use([
    'base2ind:lib-react@0.0.1',
    'base2ind:i18n@0.0.1'
  ]);

  api.addFiles([
    'lib/settings.js',
    'lib/routes.js',
    'lib/menus.js',
  ], both);

  api.addFiles([
    'lib/server/publications.js',
  ], 'server');

  api.addFiles([
    'lib/client/language_changer.js',
  ], 'client');

  var languages = ["ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fr", "hu", "id", "it", "ja", "kk", "ko", "nl", "pl", "pt-BR", "ro", "ru", "sl", "sv", "th", "tr", "vi", "zh-CN"];
  var languagesPaths = languages.map(function (language) {
    return "i18n/"+language+".i18n.json";
  });
  api.addFiles(languagesPaths, ["client", "server"]);

  api.export('Settings', both);
});
