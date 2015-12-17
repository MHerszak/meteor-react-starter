//////////////////////////////////////////////////////
// Collection Hooks                                 //
//////////////////////////////////////////////////////

/**
 * Generate HTML body from Markdown on user bio insert
 */
Users.after.insert(function (userId, user) {

  // run create user async callbacks
  Base2Ind.callbacks.runAsync("onCreateUserAsync", user);

  // check if all required fields have been filled in. If so, run profile completion callbacks
  if (Users.hasCompletedProfile(user)) {
    Base2Ind.callbacks.runAsync("profileCompletedAsync", user);
  }

  // Add a default group to the user registration
  // That is just to ensure that every user is a user by default and not PM, or Admin
  //Users.group.addRolesAndGroupsToUser(user,['user'],'user-group');

});

/**
 * Generate HTML body from Markdown when user bio is updated
 */
Users.before.update(function (userId, doc, fieldNames, modifier) {
  // if bio is being modified, update htmlBio too
  if (Meteor.isServer && modifier.$set && modifier.$set["appuser.bio"]) {
    modifier.$set["appuser.htmlBio"] = Base2Ind.utils.sanitize(marked(modifier.$set["appuser.bio"]));
  }
});

/**
 * Disallow $rename
 */
Users.before.update(function (userId, doc, fieldNames, modifier) {
  if (!!modifier.$rename) {
    throw new Meteor.Error("illegal $rename operator detected!");
  }
});

/**
 * If user.appuser.email has changed, check for existing emails and change user.emails and email hash if needed
 */
 if (Meteor.isServer) {
  Users.before.update(function (userId, doc, fieldNames, modifier) {

    var user = doc;

    // if email is being modified, update user.emails too
    if (Meteor.isServer && modifier.$set && modifier.$set["appuser.email"]) {

      var newEmail = modifier.$set["appuser.email"];

      // check for existing emails and throw error if necessary
      var userWithSameEmail = Users.findByEmail(newEmail);
      if (userWithSameEmail && userWithSameEmail._id !== doc._id) {
        throw new Meteor.Error("email_taken2", i18n.t("this_email_is_already_taken") + " (" + newEmail + ")");
      }

      // if user.emails exists, change it too
      if (!!user.emails) {
        user.emails[0].address = newEmail;
        modifier.$set.emails = user.emails;
      }

      // update email hash
      modifier.$set["appuser.emailHash"] = Gravatar.hash(newEmail);

    }
  });
}

//////////////////////////////////////////////////////
// Callbacks                                        //
//////////////////////////////////////////////////////

/**
 * Set up user object on creation
 * @param {Object} user – the user object being iterated on and returned
 * @param {Object} options – user options
 */
function setupUser (user, options) {
  // ------------------------------ Properties ------------------------------ //
  var userProperties = {
    profile: options.profile || {},
    appuser: {
      isInvited: false,
    }
  };
  user = _.extend(user, userProperties);

  // look in a few places for the user email
  if (options.email) {
    user.appuser.email = options.email;
  } else if (user.services.facebook && user.services.facebook.email) {
    user.appuser.email = user.services.facebook.email;
  }

  // look in a few places for the displayName
  if (user.profile.username) {
    user.appuser.displayName = user.profile.username;
  } else if (user.profile.name) {
    user.appuser.displayName = user.profile.name;
  } else {
    user.appuser.displayName = user.username;
  }

  // create slug from display name
  user.appuser.slug = Base2Ind.utils.slugify(user.appuser.displayName);

  // if this is not a dummy account, and is the first user ever, make them an admin
  user.isAdmin = (!user.profile.isDummy && Meteor.users.find({'profile.isDummy': {$ne: true}}).count() === 0) ? true : false;

  Events.track('new user', {username: user.username, email: user.appuser.email});

  return user;
}
/**
 * Called when a user creates their account (user).
 */
Base2Ind.callbacks.add("onCreateUser", setupUser);

function hasCompletedProfile (user) {
  return Users.hasCompletedProfile(user);
}

/**
 * Parse a user object to see if their profile is complete (user).
 */
Base2Ind.callbacks.add("profileCompletedChecks", hasCompletedProfile);

/**
 * Add new callback to do
 */
Accounts.onLogin(function ()
{
  Base2Ind.callbacks.run("checkForInvitation");
});