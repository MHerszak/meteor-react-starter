
const publicRoutes = FlowRouter.group( { name: 'public' } );
const T = _i18n.createComponent(_i18n.createTranslator('accounts-ui'));

const options = {
    registerLink: "/register"
}

publicRoutes.route( '/login', {
    name: 'login',
    triggersEnter: [Base2Ind.Router.redirectIfLoggedIn],
    action()
    {
        Base2Ind.Helper.render(App,<LoginBox registerLink={options.registerLink} /> );
    }
});

publicRoutes.route( '/register', {
    name: 'register',
    action()
    {
        Base2Ind.Helper.render(App,<RegisterBox registerLink={options.registerLink} /> );
    }
});

publicRoutes.route( '/reset-password', {
    name: 'reset-password',
    action()
    {
        Base2Ind.Helper.render(App,<ResetPasswordBox registerLink={options.registerLink} /> );
    }
});

const authenticatedRoutes = FlowRouter.group( { name: 'authenticated' } );

authenticatedRoutes.route( '/hidden', {
    name: 'hidden',
    action() {
        Base2Ind.Helper.render(App,<Hidden />  );
    }
});