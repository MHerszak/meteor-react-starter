////////////////////////////////////
// Publications and Subscriptions //
////////////////////////////////////

/**
 * Users pub/sub configs and methods
 * @namespace Users.pubsub
 */
Users.pubsub = {};

/**
 * Default user object fields in publication
 * @type {Object}
 */

var publicFields = Users.simpleSchema().getPublicFields();

// add public fields as specified in schema
Users.pubsub.publicProperties = _.object(publicFields, _.map(publicFields, function () {return true}));

/**
 * Options for your own user account (for security reasons, block certain properties)
 * @type {Object}
 */
Users.pubsub.hiddenProperties = {
  'services.password.bcrypt': false
};

/**
 * Minimum required properties to display avatars and display names
 * @type {Object}
 */
Users.pubsub.avatarProperties = {
  _id: true,
  'appuser.emailHash': true,
  'appuser.slug': true,
  'appuser.displayName': true,
  'appuser.isInvited': true,
  'username': true,
  'jobTitle' : true,
  'profile.username': true,
};

// note: to work around nested fields subscription bug, we'll publish
// all public user properties at all times for now
// see https://github.com/meteor/meteor/issues/998

Users.pubsub.avatarProperties = Users.pubsub.publicProperties;

/**
 * Build Users subscription with filter, sort, and limit args.
 * @param {String} filterBy
 * @param {String} sortBy
 * @param {Number} limit
 */
Users.pubsub.getSubParams = function(filterBy, sortBy, limit) {
  var find = {},
      sort = {createdAt: -1};

  switch(filterBy){
    case 'invited':
      // consider admins as invited
      find = { $or: [{ isInvited: true }, { isAdmin: true }]};
      break;
    case 'uninvited':
      find = { $and: [{ isInvited: false }, { isAdmin: false }]};
      break;
    case 'admin':
      find = { isAdmin: true };
      break;
  }

  switch(sortBy){
    case 'username':
      sort = { username: 1 };
      break;
    case 'invitedCount':
      sort = { invitedCount: -1 };
  }
  return {
    find: find,
    options: { sort: sort, limit: limit }
  };
};
