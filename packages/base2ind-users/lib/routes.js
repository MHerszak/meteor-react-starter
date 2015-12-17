Base2Ind.adminRoutes.route('/users', {
  name: "adminUsers",
  title:"Admin Dashboard",
  parent: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "admin_wrapper", admin: "users_dashboard"});
  }
});

FlowRouter.route('/users/:_idOrSlug', {
  name: "userProfile",
  parent: 'home',
  title: 'User Profile',
  triggersEnter: [Base2Ind.utils.checkIfSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "user_controller", userTemplate: "user_profile"});
  }
});

FlowRouter.route('/users/:_idOrSlug/edit', {
  name: "userEdit",
  parent: 'home',
  title: 'User Edit',
  triggersEnter: [Base2Ind.utils.checkIfSignedIn],
  action: function(params, queryParams) {
    BlazeLayout.render("layout", {main: "user_controller", userTemplate: "user_edit"});
  },
});

FlowRouter.route('/account', {
  name: "userAccountShortcut",
  triggersEnter: [function(context, redirect) {
    redirect("userEdit", {_idOrSlug: Meteor.userId()});
  }]
});

FlowRouter.route('/sign-out', {
  name: "signOut",
  triggersEnter: [function(context, redirect) {

    //AccountsTemplates.logout();
    //Messages.flash(i18n.t("you_have_been_logged_out"));
  }]
});