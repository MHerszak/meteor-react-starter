/**
 * The global namespace for Base2Ind utils.
 * @namespace Base2Ind.utils
 */
Base2Ind.utils = {};

Base2Ind.utils =
{
  /**
   * Convert a camelCase string to dash-separated string
   * @param str
   * @returns {string}
   */
  camelToDash(str) {
    return str.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();
  },

  /**
   * Convert an underscore-separated string to dash-separated string
   * @param str
   * @returns {*|XML|string|void}
     */
  underscoreToDash(str) {
    return str.replace('_', '-');
  },

  /**
   * Convert a dash separated string to camelCase.
   * @param str
   * @returns {*|XML|string|void}
   */
  dashToCamel(str) {
    return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
  },

  /**
   * To camelCase
   * @param str
   * @returns {string|*}
   */
  camelCaseify(str) {
    str = this.dashToCamel(str.replace(' ', '-'));
    str = str.slice(0,1).toLowerCase() + str.slice(1);
    return str;
  },

  /**
   * Trim a sentence to a specified amount of words and append an ellipsis.
   * @param s
   * @param numWords
   * @returns {*}
   */
  trimWords(s, numWords) {

    if (!s)
      return s;

    let expString = s.split(/\s+/,numWords);
    if(expString.length >= numWords)
      return expString.join(" ")+"…";
    return s;
  },

  /**
   * Trim a block of HTML code to get a clean text excerpt
   * @param html
   * @param numWords
   */
  trimHTML(html, numWords) {
    let text = Base2Ind.utils.stripHTML(html);
    return Base2Ind.utils.trimWords(text, numWords);
  },

  /**
   * Set's everything to upper case
   * @param str
   * @returns {string}
   */
  capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Log time
   * @param message
   */
  t(message) {
    let d = new Date();
    console.log("### "+message+" rendered at "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
  },

  /**
   * URL Helper Functions
   */

  /**
   * Get url for site from settings
   * @returns {*}
   */
  getSiteUrl() {
    return Settings.get('siteUrl', Meteor.absoluteUrl());
  },

  /**
   *
   * @param url
   * @returns {string}
   */
  getOutgoingUrl(url) {
    return Base2Ind.utils.getSiteUrl() + "out?url=" + encodeURIComponent(url);
  },

  /**
   * Get root url using FlowRouter
   * @param routeName
   * @param params
   * @param options
   * @returns {*}
   */
  getRouteUrl(routeName, params, options) {
    options = options || {};
    let route = FlowRouter.path(
        routeName,
        params || {},
        options
    );
    return route;
  },

  /**
   * Some links are not properly build so slashes have to be deleted
   * @param src
   * @param replacement
   * @returns {*|XML|string|void}
   */
  findAndReplaceForwardSlash(src,replacement)
  {
    return src.replace('/',replacement);
  },

  /**
   * This helps to obtain the full path based on your current page.
   * @returns {*}
   */
  getSignupUrl() {
    return this.getSiteUrl() + this.findAndReplaceForwardSlash(this.getRouteUrl('signUp'),'');
  },

  /**
   *
   * @returns {*}
   */
  getSigninUrl()
  {
    return this.getSiteUrl() + this.findAndReplaceForwardSlash(this.getRouteUrl('signIn'),'');
  },

  /**
   *
   * @param s
   * @returns {*}
   */
  slugify(s)
  {
    let slug = getSlug(s, {
      truncate: 60
    });

    // can't have posts with an "edit" slug
    if (slug === "edit") {
      slug = "edit-1";
    }

    return slug;
  },

  /**
   *
   * @param url
   * @returns {string}
   */
  getDomainfunction(url) {
    let urlObject = Npm.require('url');
    return urlObject.parse(url).hostname.replace('www.', '');
  },

  /**
   * This is only necessary if you care about
   * @returns {*}
   */
  invitesEnabled() {
    return Settings.get("requireViewInvite") || Settings.get("requirePostInvite");
  },

  /**
   *
   * @param url
   * @returns {*}
   */
  addHttp(url)
  {
    if (url.substring(0, 5) !== "http:" && url.substring(0, 6) !== "https:") {
      url = "http:"+url;
    }
    return url;
  },

  /**
   *
   * @param s
   * @returns {*|XML|string|void}
   */
  cleanUp(s) {
    return this.stripHTML(s);
  },

  /**
   *
   * @param s
   * @returns {*}
   */
  sanitize(s) {
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
  },

  /**
   *
   * @param s
   * @returns {*|XML|string|void}
   */
  stripHTML(s) {
    return s.replace(/<(?:.|\n)*?>/gm, '');
  },

  /**
   *
   * @param s
   */
  stripMarkdown(s) {
    let htmlBody = marked(s);
    return Base2Ind.utils.stripHTML(htmlBody);
  },

  /**
   * Source: // http://stackoverflow.com/questions/2631001/javascript-test-for-existence-of-nested-object-key
   * @param obj
   * @returns {boolean}
   */
  checkNested(obj) {
    let args = Array.prototype.slice.call(arguments);
    obj = args.shift();

    for (let i = 0; i < args.length; i++) {
      if (!obj.hasOwnProperty(args[i])) {
        return false;
      }
      obj = obj[args[i]];
    }
    return true;
  },

  /**
   *
   * @param obj
   * @returns {Array}
   */
  getObjectKeys(obj)
  {
    let keys = [];
    for(let key in obj)
    {
      /** Push to array */
      keys.push(key);
    }
    return keys;
  },

  /**
   *
   * @param s
   */
  log(s) {
    if(Settings.get('debug', false))
      console.log(s);
  },

  /**
   * Source: http://stackoverflow.com/questions/8051975/access-object-child-properties-using-a-dot-notation-string
   * @param obj
   * @param desc
   * @returns {*}
     */
  getNestedProperty(obj, desc) {
    let arr = desc.split(".");
    while(arr.length && (obj = obj[arr.shift()]));
    return obj;
  },

  /**
   * Am I signed in? Helps with routing on trigger for router.
   */
  checkIfSignedIn() {
    let route;
    if (!(Meteor.loggingIn() || Meteor.userId())) {
      route = FlowRouter.current();
      if (route.route.name !== 'login') {
        Session.set('redirectAfterLogin', route.path);
      }
      return FlowRouter.go("/");
    }
  },

  /**
   *
   * @param email
   * @returns {boolean}
   */
  emailIsUnique(email)
  {
    return Meteor.users.findOne({"emails.address": email}) == null;
  },

  /**
   *
   * @param user
   * @returns {*}
   */
  determineEmail(user)
  {
    var emailAddress, services;
    if (user.emails) {
      return emailAddress = user.emails[0].address;
    } else if (user.services) {
      services = user.services;
      return emailAddress = (function() {
        switch (false) {
          case !services.facebook:
            return services.facebook.email;
          case !services.github:
            return services.github.email;
          case !services.google:
            return services.google.email;
          case !services.twitter:
            return null;
          default:
            return null;
        }
      })();
    } else {
      return null;
    }
  },

  /**
   * Creates a costume designer user in the database.
   * <p>A costume designer is a kind of user in our system that have permission to create closets, projects and have a public profile in our system, as well as being a part of our revenue program.</p>
   * <p>A username will be automatically generated for the user, made from his name and surname.</p>
   * @param firstName
   * @param lastName
   * @param email
   * @param password
   * @returns {*}
   * @constructor
   */
  CreateUser(firstName, lastName, email, password)
  {
    if (!Base2Ind.utils.emailIsUnique(email))
      throw new Meteor.Error("The given email is already being used by another user");

    var profile =
    {
      accountToken: "",
      completed: false,
      userProfile: {first_name: firstName, last_name: lastName, shortName: name, bio: "", picture: "/img/user.png"}
    };

    let id = Accounts.createUser({username: email, email: email, password: password, profile: profile});
    return id;
  },

  /**
   * For Facebook signup
   * @param options
   * @param signupInfo
   * @returns {string}
   * @constructor
   */
  createUserHook(options, signupInfo)
  {
    return CreateUser(options.profile.first_name, options.profile.last_name, signupInfo.email, options.password);
  },

  /**
   * Checks whether a passed object is a function. In most cases I am checking for callback functions.
   * @param object
   * @returns {*|boolean}
   */
  isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  },

};