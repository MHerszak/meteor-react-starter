
//instance of translate component in "accounts-ui" namespace
const T = _i18n.createComponent(_i18n.createTranslator('accounts-ui'));

LoginForm = React.createClass({
    displayName: 'LoginForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired
    },
    render () {
        let services = utils.getServiceNames();
        //console.log("services: ", services);
        const { clearErrors, onError } = this.props;
        //`Sign in with ${utils.capitalize(service)}`
        return (
            <div className="ui form">

                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`${_i18n.__('accounts-ui', 'sign_in_with')} ${utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && utils.hasPasswordService() ?
                    <div className="ui horizontal divider"><T>sign_in_with_email</T></div> : ''
                }

                {utils.hasPasswordService() ?
                    <PasswordForm
                        type="login"
                        onError={ onError }
                        clearErrors={ clearErrors }
                      /> : ''
                }

            </div>
        );
    }
});

_.extend(Base2Ind,{LoginForm});