Accounts.onLogin(function() {
    var path = FlowRouter.current().path;
    console.log('path: ', path);
    // we only do it if the user is in the login page
    if(path === "/login"){
        FlowRouter.go("/");
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
