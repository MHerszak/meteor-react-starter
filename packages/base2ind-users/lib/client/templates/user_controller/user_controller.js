/*
Template.user_controller.onCreated(function () {
  var template = this;
  template.subscribe('singleUser', FlowRouter.getParam("_idOrSlug"));
});

Template.user_controller.helpers({
  data: function ()
  {
    var idOrSlug = FlowRouter.getParam("_idOrSlug"),
        findById = Meteor.users.findOne(idOrSlug),
        findBySlug = Meteor.users.findOne({"appuser.slug": idOrSlug});

    return {
      user: findById || findBySlug
    };
  }
});*/
