let {Utils} = Base2Ind.Helper;
//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

LoginForm = React.createClass({
    displayName: 'LoginForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired
    },
    render () {
        let services = Utils.getServiceNames();
        //console.log("services: ", services);
        const { clearErrors, onError } = this.props;
        //`Sign in with ${Utils.capitalize(service)}`
        return (
            <div className="ui form">

                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`${_i18n.__('accounts-ui', 'sign_in_with')} ${Utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && Utils.hasPasswordService() ?
                    <div className="ui horizontal divider"><T>sign_in_with_email</T></div> : ''
                }

                {Utils.hasPasswordService() ?
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