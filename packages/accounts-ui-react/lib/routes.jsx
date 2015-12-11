
const publicRoutes = FlowRouter.group( { name: 'public' } );

publicRoutes.route( '/login', {
    name: 'login',
    action()
    {
        Base2Ind.Helper.render(App,<Login /> );
    }
});

const authenticatedRoutes = FlowRouter.group( { name: 'authenticated' } );

authenticatedRoutes.route( '/hidden', {
    name: 'hidden',
    action() {
        Base2Ind.Helper.render(App,<Hidden />  );
    }
});