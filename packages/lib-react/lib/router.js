FlowRouter.addToQueryArray = function (key, value) {
    var keyArray = FlowRouter.getQueryParam(key) || [];
    keyArray.push(value);
    var params = {};
    params[key] = keyArray;
    FlowRouter.setQueryParams(params);
}

FlowRouter.removeFromQueryArray = function (key, value) {
    var keyArray = FlowRouter.getQueryParam(key);
    keyArray = _.without(keyArray, value);
    var params = {};
    params[key] = keyArray;
    FlowRouter.setQueryParams(params);
}

/**
 * Router functions that can be used to check whether you are logged in and should proceed or
 * if you are not logged in and should be redirected.
 *
 * @type {{checkLoggedIn: (function(*, *)), redirectIfLoggedIn: (function(*, *))}}
 */
Base2Ind.Router =
{
    checkLoggedIn (ctx, redirect) {
        if (!Meteor.userId()) {
            redirect('/')
        }
    },

    /**
     * For public routes such as
     * @param ctx
     * @param redirect
     */
    redirectIfLoggedIn (ctx, redirect) {
        if (Meteor.userId()) {
            redirect('/')
        }
    }
}

Base2Ind.adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [
        function()
        {
            var route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                route = FlowRouter.current();
                if (route.route.name !== 'login') {
                    Session.set('redirectAfterLogin', route.path);
                }
                return redirect("/");
            }
        }
    ],
    title: 'Admin',
    parent: 'home'
});

//FlowRouter.triggers.exit([function () {Messages.clearSeen()}]);
//FlowRouter.triggers.exit([function () {Events.analyticsInit()}]); // will only run once thanks to _.once()
//FlowRouter.triggers.exit([function () {Events.analyticsRequest()}]);