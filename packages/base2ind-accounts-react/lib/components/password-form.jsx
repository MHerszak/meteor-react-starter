let {Utils} = Base2Ind.Helper;

//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

PasswordForm = React.createClass({
    displayName: 'PasswordForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired,
        type: React.PropTypes.oneOf(['login', 'register']).isRequired
    },
    getInitialState () {
        return {
            loading: false
        };
    },
    /**
     *
     * @param e
     */
    handleSubmit (e)
    {
        e.preventDefault();

        const { clearErrors, onError } = this.props;
        var passwordNode = this.refs.password;
        var emailNode = this.refs.email;

        if (this.props.type === 'login') {
            // log in / sign in

            this.setState({loading: true});

            Users.loginWithPassword(emailNode.value, passwordNode.value, (err) =>
            {
                // let errors = this.state.errors;
                this.setState({loading: false});

                if (err && err.error === 400) {
                    onError(_i18n.__(NAMESPACE, 'invalid_usename_or_password'));
                } else if (err) {
                    onError(err.reason || _i18n.__(NAMESPACE, 'unknown_error'));
                } else {
                    clearErrors();
                }
            });

        } else {
            // register / sign up
            var passwordNode2 = this.refs.password2;

            if (passwordNode.value !== passwordNode2.value) {
                onError(i18n.__(NAMESPACE, 'passwords_dont_match'));

                return;
            }

            this.setState({loading: true});

            let credentials = {email: emailNode.value, password: passwordNode.value};

            Users.createUser(credentials, (err) =>
            {
                this.setState({loading: false});
                if (err) {
                    onError(err.reason || i18n.__(NAMESPACE, 'unknown_error'));
                } else {
                    clearErrors();
                    // this.refs.form.reset();
                }
            });
        }
    },
    render ()
    {
        if (!Utils.hasPasswordService()) {
            return <div></div>;
        }
        let isRegistration = (this.props.type === 'register');

        return (
            <form onSubmit={this.handleSubmit}
                  className={'form' + (this.state.loading ? ' loading' : '')}
                  ref="form">

                <div className="required field">
                    <label><T>email</T></label>
                    <input type="email"
                           placeholder={ _i18n.__(NAMESPACE, 'email') }
                           ref="email" />
                </div>

                <div className="required field">
                    <label><T>password</T></label>
                    <input
                        type="password"
                        placeholder={ _i18n.__(NAMESPACE, 'password') }
                        ref="password"/>
                </div>

                {isRegistration ?
                    <div className="required field">
                        <label><T>repeat_password</T></label>
                        <input
                            type="password"
                            placeholder={ _i18n.__(NAMESPACE, 'repeat_password') }
                            ref="password2"/>
                    </div>
                    : ''}

                <button type="submit"
                        className="center-align btn btn-flat">
                    { isRegistration ?
                        _i18n.__(NAMESPACE, 'sign_up') :
                        _i18n.__(NAMESPACE, 'sign_in') }
                </button>
            </form>
        );
    }
});

_.extend(Base2Ind,{PasswordForm});