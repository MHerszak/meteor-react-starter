//i18n = {};

// do this better:
_i18n.setLanguage = function (language) {
  // Session.set('i18nReady', false);
  // console.log('i18n loading… '+language)

  // moment
  Session.set('momentReady', false);
  // console.log('moment loading…')
  if (language.toLowerCase() === "en") {
    Session.set('momentReady', true);
  } else {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/lang/" + language.toLowerCase() + ".js", function (result) {
      moment.locale(language);
      Session.set('momentReady', true);
      Session.set('momentLocale', language);
      // console.log('moment loaded!')
    });
  }

  /*// TAPi18n
  Session.set("TAPi18nReady", false);
  // console.log('TAPi18n loading…')
  TAPi18n.setLanguage(language)
    .done(function () {
      Session.set("TAPi18nReady", true);
      // console.log('TAPi18n loaded!')
    });

  // T9n
  T9n.setLanguage(language);*/
};

_i18n.t = function (str, options) {
  if (Meteor.isServer) {
    return _i18n.__(str, options, Settings.get('language', 'en'));
  } else {
    return _i18n.__(str, options);
  }
};

Mongo.Collection.prototype.internationalize = function(){
  var schema = this.simpleSchema()._schema;
  _.each(schema, function (property, key) {
    if (!property.label) {
      schema[key].label = function () {

        if (key.indexOf(".") !== -1) {
          key = _.last(key.split("."));
        }
        return _i18n.t(key);
      };
    }
  });
  return this;
};

Meteor.startup(function ()
{
  if (Meteor.isClient) {
    _i18n.setLanguage(Settings.get('language', 'en'));
  }
});
