'use strict'

/**
 * @namespace Users.is
 */
Users.is = {};

/**
 * Checks for existing fields on a user
 * @namespace User.group
 */
Users.group = {};

/**
 * Check if a user is an admin
 * @param {Object|string} userOrUserId - The user or their userId
 */
Users.is.admin = function (userOrUserId) {
  try {
    var user = Users.getUser(userOrUserId);
    return !!user && !!user.isAdmin;
  } catch (e) {
    return false; // user not logged in
  }
};
Users.is.adminById = Users.is.admin;

/**
 * Check if a user is a project manager. Be careful, attribute projectName is not available for publications.
 * TODO: Get the right roles, i.e. (super-admin?,admin, project-manager,users,non-app-users => special case, client)
 * @param userOrUserId
 * @param project
 * @returns {boolean}
 */
Users.is.projectManager = function (userOrUserId,projectName) {

    var project = projectName;

    try
    {
        var user = Users.getUser(userOrUserId);

        return user && Roles.userIsInRole(user._id, ['project-manager'],project);
    }
    catch (e) {
        throw new Meteor.Error("User not logged in:",e); // user not logged in
    }
};

/**
 * User with the role user
 * @param userOrUserId
 * @returns {boolean}
 */
Users.is.user = function (userOrUserId) {
  try {
    var user = Users.getUser(userOrUserId);
    return !!user && !!Roles.userIsInRole(user._id, ['user'],'user-group');
  } catch (e) {
    throw new Meteor.Error("You are not logged in."); // user not logged in
  }
};
Users.is.userById = Users.is.user;

/**
 * Check if a user owns a document
 * @param {Object|string} userOrUserId - The user or their userId
 * @param {Object} document - The document to check (post, comment, user object, etc.)
 */
Users.is.owner = function (userOrUserId, document) {
  try {
    var user = Users.getUser(userOrUserId);
    if (!!document.userId) {
      // case 1: document is a post or a comment, use userId to check
      return user._id === document.userId;
    } else {
      // case 2: document is a user, use _id to check
      return user._id === document._id;
    }
  } catch (e) {
    return false; // user not logged in
  }
};
Users.is.ownerById = Users.is.owner;

Users.is.invited = function (userOrUserId) {
  try {
    var user = Users.getUser(userOrUserId);
    return Users.is.admin(user) || user.appuser.isInvited;
  } catch (e) {
    return false; // user not logged in
  }
};
Users.is.invitedById = Users.is.invited;

/**
 * Deletes a group key from roles object inside user object
 * @param userOrUserId
 * @param groupName
 * @returns {boolean}
 */
Users.group.delete = function (userOrUserId,groupName)
{
    var user,newRoles;

    try
    {
        user = Users.getUser(userOrUserId);

        newRoles = _.omit(user.roles,groupName);

        Meteor.users.update({_id:user._id},{$set:{roles:newRoles}});
    }
    catch (e)
    {
    return false; // user not logged in
    }
}

/**
 * Add roles and groups to a user
 * Default during user creation: user, user-group
 * @param users
 * @param roles
 * @param group
 */
Users.group.setRolesOnUserObj = function (users, roles, group)
{
    if (!users)
    {
        throw new Error ("Missing 'users' param");
    }

    if (!roles)
    {
        throw new Error ("Missing 'roles' param");
    }

    if (group)
    {
        if ('string' !== typeof group)
        {
            throw new Error ("Roles error: Invalid parameter 'group'. Expected 'string' type");
        }

        if ('$' === group[0])
        {
            throw new Error ("Roles error: groups can not start with '$'")
        }

        // convert any periods to underscores
        group = group.replace(/\./g, '_')
    }

    /**
     * Ensure arrays to simplify code
     */
    if (!_.isArray(users))
    {
        users = [users]
    }

    if (!_.isArray(roles))
    {
        roles = [roles]
    }

    /**
     * Remove invalid roles
     * @type {*}
     */
    roles = _.reduce(roles, function (memo, role)
    {
        if (role
            && 'string' === typeof role
            && role.trim().length > 0) {
            memo.push(role.trim())
        }
        return memo
    }, []);

    /**
     * if roles is empty, quit
     */
    if (roles.length === 0) return

    /**
     * Ensure all roles exist in 'roles' collection
     * @type {*}
     */
    var existingRoles = _.reduce(Meteor.roles.find({}).fetch(), function (memo, role) {
        memo[role.name] = true
        return memo
    }, {});

    _.each(roles, function (role)
    {
        if (!existingRoles[role]) {
            Roles.createRole(role)
        }
    });

    /**
     * Ensure users is an array of objects
     */
    _.each(users, function (user)
    {
        if ('object' !== typeof user) {
            throw new Error("Expected 'users' argument to be an object or array of objects")
        }
    });

    /**
     * Set the roles on the actual user object
     */
    if (group)
    {

        /**
         * Roles is a key/value dict object
         */
        _.each(users, function (user)
        {
            user.roles = {}
            user.roles[group] = roles
        })

    }
    else {

        /**
         * Roles is an array of strings
         */
        _.each(users, function (user) {
            user.roles = roles
        })

    }

}  // end setRolesOnUserObj

/**
 * Add roles and groups to a user
 * Default during user creation: user, user-group
 * @param user
 * @param roles
 * @param group
 */
/*Users.group.addRolesAndGroupsToUser = function(user,roles,group)
{
    if(user){
        Roles.addUsersToRoles(user._id,roles,group);
    }
}*/


/*Meteor.users.helpers({
  // conflicts with user.isAdmin property
  // isAdmin: function () {
  //   return Users.is.admin(this);
  // },
  isOwner: function (document) {
    return Users.is.owner(this, document);
  },
  isInvited: function () {
    return Users.is.invited(this);
  }
});*/
