/**
 * Accept either an ID or a slug
 */
Meteor.publish('singleUser', function(idOrSlug)
{
  var findById = Meteor.users.findOne(idOrSlug),
      findBySlug = Meteor.users.findOne({"appuser.slug": idOrSlug}),
      user = typeof findById !== 'undefined' ? findById : findBySlug,
      options = Users.is.adminById(this.userId) ? {} : {};

  if (user)
  {
    return Meteor.users.find({_id: user._id}, options);
  }

  return [];
});

// Publish the current user

Meteor.publish('currentUser', function() {
  var user = Meteor.users.find({_id: this.userId}, {fields: Users.pubsub.hiddenProperties});
  return user;
});

// publish all users for admins to make autocomplete work
// TODO: find a better way

Meteor.publish('allUsersAdmin', function() {
  var selector = Settings.get('requirePostInvite') ? {isInvited: true} : {}; // only users that can post
  if (Users.is.adminById(this.userId)) {
    return Meteor.users.find(selector, {fields: Users.pubsub.avatarProperties});
  }
  return [];
});

/**
 * Users in this table are only published when subscription permits it.
 */
/*ReactiveTable.publish("all-users", function() {

  return Meteor.users;

});*/
