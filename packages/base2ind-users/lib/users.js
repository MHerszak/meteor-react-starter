
/**
 * User Data schema
 * @type {SimpleSchema}
 */
Base2Ind.schemas.userData = new SimpleSchema({
  /**
    Bio (Markdown version)
  */
  bio: {
    type: String,
    optional: true,
    editableBy: ["member", "admin"],
    autoform: {
      rows: 5
    }
  },
  /**
    The name displayed throughout the app. Can contain spaces and special characters, doesn't need to be unique
  */
  displayName: {
    type: String,
    optional: true,
    public: true,
    profile: true,
    editableBy: ["member", "admin"]
  },
  /**
    The user's email. Modifiable.
  */
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    required: true,
    editableBy: ["member", "admin"],
    unique: true // note: find a way to fix duplicate accounts before enabling this
  },
  /**
    A hash of the email, used for Gravatar // TODO: change this when email changes
  */
  emailHash: {
    type: String,
    ////public: true,
    optional: true
  },
  /**
    The HTML version of the bio field
  */
  htmlBio: {
    type: String,
    public: true,
    profile: true,
    optional: true,
    autoform: {
      omit: true
    },
    template: "user_profile_bio"
  },
  /**
    A blackbox modifiable object to store the user's settings
  */
  settings: {
    type: Object,
    optional: true,
    editableBy: ["user", "admin"],
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  /**
    The user's profile URL slug // TODO: change this when displayName changes
  */
  slug: {
    type: String,
    public: true,
    optional: true
  },
  /**
    A link to the user's homepage
  */
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    public: true,
    profile: true,
    optional: true,
    editableBy: ["member", "admin"]
  }
});

/**
 * Users schema
 * @type {SimpleSchema}
 */
Users.schema = new SimpleSchema({
  _id: {
    type: String,
    public: true,
    optional: true
  },
  username: {
    type: String,
     regEx: /^[a-z0-9A-Z_]{3,15}$/,
    public: true,
    optional: true
  },

  emails: {
    type: [Object],
    optional: true
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    public: true,
    optional: true
  },
  isAdmin: {
    type: Boolean,
    optional: true,
    editableBy: ["admin"],
    autoform: {
      omit: true
    }
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  appuser: { // appuser-specific data
    type: Base2Ind.schemas.userData,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.startup(function(){
  Users.internationalize();
});

/**
 * Attach schema to Meteor.users collection
 */
Users.attachSchema(Users.schema);

/**
 * Users collection permissions
 */

Users.allow({
  update: _.partial(Base2Ind.allowCheck, Meteor.users),
  remove: _.partial(Base2Ind.allowCheck, Meteor.users)
});

