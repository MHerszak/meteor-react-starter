
const publicRoutes = FlowRouter.group( { name: 'public' } );

publicRoutes.route( '/login', {
    name: 'login',
    triggersEnter: [Base2Ind.Router.redirectIfLoggedIn],
    action()
    {
        Base2Ind.Helper.render(App,<LoginBox /> );
    }
});

publicRoutes.route( '/register', {
    name: 'register',
    action()
    {
        Base2Ind.Helper.render(App,<RegisterBox /> );
    }
});

const authenticatedRoutes = FlowRouter.group( { name: 'authenticated' } );

authenticatedRoutes.route( '/hidden', {
    name: 'hidden',
    action() {
        Base2Ind.Helper.render(App,<Hidden />  );
    }
});