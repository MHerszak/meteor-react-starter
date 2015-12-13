/**
 * The global namespace for Base2Ind utils.
 * @namespace Base2Ind.utils
 */
Base2Ind.utils = {};

/**
 * Convert a camelCase string to dash-separated string
 * @param {String} str
 */
Base2Ind.utils.camelToDash = function (str) {
  return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Convert an underscore-separated string to dash-separated string
 * @param {String} str
 */
Base2Ind.utils.underscoreToDash = function (str) {
  return str.replace('_', '-');
};

/**
 * Convert a dash separated string to camelCase.
 * @param {String} str
 */
Base2Ind.utils.dashToCamel = function (str) {
  return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

/**
 * Convert a string to camelCase and remove spaces.
 * @param {String} str
 */
Base2Ind.utils.camelCaseify = function(str) {
  str = this.dashToCamel(str.replace(' ', '-'));
  str = str.slice(0,1).toLowerCase() + str.slice(1);
  return str;
};

/**
 * Trim a sentence to a specified amount of words and append an ellipsis.
 * @param {String} s - Sentence to trim.
 * @param {Number} numWords - Number of words to trim sentence to.
 */
Base2Ind.utils.trimWords = function(s, numWords) {

  if (!s)
    return s;

  var expString = s.split(/\s+/,numWords);
  if(expString.length >= numWords)
    return expString.join(" ")+"…";
  return s;
};

/**
 * Trim a block of HTML code to get a clean text excerpt
 * @param {String} html - HTML to trim.
 */
Base2Ind.utils.trimHTML = function (html, numWords) {
  var text = Base2Ind.utils.stripHTML(html);
  return Base2Ind.utils.trimWords(text, numWords);
};

/**
 * Capitalize a string.
 * @param {String} str
 */
Base2Ind.utils.capitalise = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

Base2Ind.utils.t = function(message) {
  var d = new Date();
  console.log("### "+message+" rendered at "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
};

Base2Ind.utils.nl2br = function(str) {
  var breakTag = '<br />';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
};

Base2Ind.utils.scrollPageTo = function(selector) {
  $('body').scrollTop($(selector).offset().top);
};

Base2Ind.utils.getDateRange = function(pageNumber) {
  var now = moment(new Date());
  var dayToDisplay=now.subtract(pageNumber-1, 'days');
  var range={};
  range.start = dayToDisplay.startOf('day').valueOf();
  range.end = dayToDisplay.endOf('day').valueOf();
  // console.log("after: ", dayToDisplay.startOf('day').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  // console.log("before: ", dayToDisplay.endOf('day').format("dddd, MMMM Do YYYY, h:mm:ss a"));
  return range;
};

//////////////////////////
// URL Helper Functions //
//////////////////////////

/**
 * Returns the user defined site URL or Meteor.absoluteUrl
 */
Base2Ind.utils.getSiteUrl = function () {
  return Settings.get('siteUrl', Meteor.absoluteUrl());
};

/**
 * The global namespace for Base2Ind utils.
 * @param {String} url - the URL to redirect
 */
Base2Ind.utils.getOutgoingUrl = function (url) {
  return Base2Ind.utils.getSiteUrl() + "out?url=" + encodeURIComponent(url);
};

/**
 *
 * @param routeName
 * @param params
 * @param options
 * @returns {*}
 */
Base2Ind.utils.getRouteUrl = function (routeName, params, options) {
  options = options || {};
  var route = FlowRouter.path(
      routeName,
      params || {},
      options
  );
  return route;
};

Base2Ind.utils.findAndReplaceForwardSlash = function (src,replacement)
{
  return src.replace('/',replacement);
}

Base2Ind.utils.getSignupUrl = function() {
  return this.getSiteUrl() + this.findAndReplaceForwardSlash(this.getRouteUrl('signUp'),'');
};

Base2Ind.utils.getSigninUrl = function() {
  return this.getSiteUrl() + this.findAndReplaceForwardSlash(this.getRouteUrl('signIn'),'');
};

Base2Ind.utils.slugify = function (s) {
  var slug = getSlug(s, {
    truncate: 60
  });

  // can't have posts with an "edit" slug
  if (slug === "edit") {
    slug = "edit-1";
  }

  return slug;
};

Base2Ind.utils.getUnusedSlug = function (collection, slug) {
  var suffix = "";
  var index = 0;

  // test if slug is already in use
  while (!!collection.findOne({slug: slug+suffix})) {
    index++;
    suffix = "-"+index;
  }

  return slug+suffix;
};

Base2Ind.utils.getShortUrl = function(post) {
  return post.shortUrl || post.url;
};

Base2Ind.utils.getDomain = function(url) {
  var urlObject = Npm.require('url');
  return urlObject.parse(url).hostname.replace('www.', '');
};

Base2Ind.utils.invitesEnabled = function() {
  return Settings.get("requireViewInvite") || Settings.get("requirePostInvite");
};

// add http: if missing
Base2Ind.utils.addHttp = function (url) {
  if (url.substring(0, 5) !== "http:" && url.substring(0, 6) !== "https:") {
    url = "http:"+url;
  }
  return url;
};

Base2Ind.utils.cleanUp = function(s) {
  return this.stripHTML(s);
};

Base2Ind.utils.sanitize = function(s) {
  // console.log('// before sanitization:')
  // console.log(s)
  if(Meteor.isServer){
    s = sanitizeHtml(s, {
      allowedTags: [
        'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul',
        'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike',
        'code', 'hr', 'br', 'div', 'table', 'thead', 'caption',
        'tbody', 'tr', 'th', 'td', 'pre', 'img'
      ]
    });
    // console.log('// after sanitization:')
    // console.log(s)
  }
  return s;
};

Base2Ind.utils.stripHTML = function(s) {
  return s.replace(/<(?:.|\n)*?>/gm, '');
};

Base2Ind.utils.stripMarkdown = function(s) {
  var htmlBody = marked(s);
  return Base2Ind.utils.stripHTML(htmlBody);
};

// http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
Base2Ind.utils.checkNested = function(obj /*, level1, level2, ... levelN*/) {
  var args = Array.prototype.slice.call(arguments);
  obj = args.shift();

  for (var i = 0; i < args.length; i++) {
    if (!obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
};

/**
 *
 * @param obj
 * @returns {Array}
 */
Base2Ind.getObjectKeys = function (obj) {
  var keys = [];
  for(var key in obj)
  {
    console.log("obj: ", key);
    keys.push(key);
  }
  return keys;
}

Base2Ind.log = function (s) {
  if(Settings.get('debug', false))
    console.log(s);
};

// see http://stackoverflow.com/questions/8051975/access-object-child-properties-using-a-dot-notation-string
Base2Ind.getNestedProperty = function (obj, desc) {
  var arr = desc.split(".");
  while(arr.length && (obj = obj[arr.shift()]));
  return obj;
};

Base2Ind.utils.checkIfSignedIn = function checkIfSignedIn() {
  var route;
  if (!(Meteor.loggingIn() || Meteor.userId())) {
    route = FlowRouter.current();
    if (route.route.name !== 'login') {
      Session.set('redirectAfterLogin', route.path);
    }
    return FlowRouter.go("/");
  }
}

/**
 * Get the team detail url in order for the new user to check in with them.
 * @returns {*}
 */
Base2Ind.utils.getTeamDetailUrl = function() {
  return this.getSiteUrl() + this.findAndReplaceForwardSlash(this.getRouteUrl('dashboardTeams'),'') + "/";
};