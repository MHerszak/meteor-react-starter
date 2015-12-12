/**
 * This limits the redirect to routes which are part of the public group,
 * so if the user in question navigates to a different private route (profile, for example),
 * they'll be unaffected.
 */
Accounts.onLogin(function () {
    if (FlowRouter.current().route.group.name === 'public') {
        FlowRouter.go('dashboard')
    }
});

/*
Accounts.onLogin(function() {
    var redirect;
    redirect = Session.get("redirectAfterLogin");
    if (redirect != null) {
        if (redirect !== '/login') {
            return FlowRouter.go(redirect);
        }
    }
});*/
