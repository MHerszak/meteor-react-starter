/*Base2Ind.modules.add("secondaryNav", [
  {
    template: 'user_menu',
    order: 10
  }
]);

Base2Ind.modules.add("mobileNav", [
  {
    template: 'user_menu',
    order: 20
  }
]);*/

var userMenuItems = [
  {
    route: function () {
      var user = Meteor.user();
      return FlowRouter.path('userProfile', {_idOrSlug: user && user.appuser && user.appuser.slug});
    },
    label: 'profile',
    description: 'view_your_profile'
  },
  {
    route: function () {
      var user = Meteor.user();
      return FlowRouter.path('userEdit', {_idOrSlug: user && user.appuser && user.appuser.slug});
    },
    label: 'edit_account',
    description: 'edit_your_profile'
  },
  {
    route: 'adminSettings',
    label: 'settings',
    description: 'settings',
    adminOnly: true
  },
  {
    route: 'signOut',
    label: 'sign_out',
    description: 'sign_out'
  }
]

// add label & description i18n functions
userMenuItems = userMenuItems.map(function (item) {
  item.label = _.partial(_i18n.t, item.label);
  item.description = _.partial(_i18n.t, item.description);
  return item;
});

Base2Ind.menuItems.add("userMenu", userMenuItems);

// array containing items in the admin menu
Base2Ind.menuItems.add("adminMenu", [
  {
    route: 'adminUsers',
    label: function () { return _i18n.t('users'); },
    description: function () { return _i18n.t('users_dashboard'); }
  }
]);
