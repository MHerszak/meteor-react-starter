
const publicRoutes = FlowRouter.group( { name: 'public' } );

publicRoutes.route( '/login', {
    name: 'login',
    action() {
        ReactLayout.render( App, { yield: <Login /> } );
    }
});

const authenticatedRoutes = FlowRouter.group( { name: 'authenticated' } );

authenticatedRoutes.route( '/hidden', {
    name: 'hidden',
    action() {
        ReactLayout.render( App, { yield: <Hidden /> } );
    }
});