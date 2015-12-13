// note: using collection helpers here is probably a bad idea,
// because they'll throw an error when the user is undefined

/**
 * Simple Permissions without roles package
 * @namespace Users.can
 */
Users.can = {};

/**
 * Permissions checks.  Return true if all is well.
 * @param {Object} user - Meteor.user()
 */
Users.can.view = function (user) {
  if (Settings.get('requireViewInvite', false)) {

    if (Meteor.isClient) {
      // on client only, default to the current user
      user = (typeof user === 'undefined') ? Meteor.user() : user;
    }

    return (!!user && (Users.is.admin(user) || Users.is.invited(user)));
  }
  return true;
};
//Users.helpers({canView: function () {return Users.can.view(this);}});


Users.can.viewById = function (userId) {
  // if an invite is required to view, run permission check, else return true
  if (Settings.get('requireViewInvite', false)) {
    return !!userId ? Users.can.view(Meteor.users.findOne(userId)) : false;
  }
  return true;
};
//Users.helpers({canViewById: function () {return Users.can.viewById(this);}});

/**
 * Check if a user can edit a document
 * @param {Object} user - The user performing the action
 * @param {Object} document - The document being edited
 */
Users.can.edit = function (user, document) {
  user = (typeof user === 'undefined') ? Meteor.user() : user;

  if (!user || !document) {
    return false;
  }

  var adminCheck = Users.is.admin(user),
      ownerCheck = Users.is.owner(user, document);

  return adminCheck || ownerCheck;
};
//Users.helpers({canEdit: function (document) {return Users.can.edit(this, document);}});

Users.can.editById = function (userId, document) {
  var user = Meteor.users.findOne(userId);
  return Users.can.edit(user, document);
};
//Users.helpers({canEditById: function (document) {return Users.can.editById(this, document);}});

/**
 * Check if a user can submit a field
 * @param {Object} user - The user performing the action
 * @param {Object} field - The field being edited or inserted
 */
Users.can.submitField = function (user, field,group) {

  if (!field.editableBy || !user) {
    return false;
  }

  /**
   * Todo: This part needs more thinking but it is good at the moment.
   * @type {boolean}
   */
  var userHasRoles = Users.is.projectManager(user,group),
      adminCheck = _.contains(field.editableBy, "admin") && Users.is.admin(user),
      memberCheck = _.contains(field.editableBy, "user"); // is the field editable by regular users?

  return adminCheck || memberCheck || userHasRoles;

};
//Users.helpers({canSubmitField: function (field) {return Users.can.submitField(this, field);}});

/** @function
 * Check if a user can edit a field – for now, identical to Users.can.submitField
 * @param {Object} user - The user performing the action
 * @param {Object} field - The field being edited or inserted
 */
Users.can.editField = Users.can.submitField;

Users.can.invite = function (user) {
  return Users.is.invited(user) || Users.is.admin(user);
};
//Users.helpers({canInvite: function () {return Users.can.invite(this);}});

