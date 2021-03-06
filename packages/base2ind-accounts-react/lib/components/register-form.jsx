let {Utils} = Base2Ind.Helper;
//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

RegisterForm = React.createClass({
    displayName: 'RegisterForm',
    propTypes: {
        clearErrors: React.PropTypes.func.isRequired,
        onError: React.PropTypes.func.isRequired
    },
    render () {
        let services = Utils.getServiceNames();
        const { clearErrors, onError } = this.props;

        return (<div>
                <div>
                    {services.map(service => {
                        return (
                            <OAuthButton
                                service={service}
                                text={`${_i18n.__(NAMESPACE, 'sign_up_with')} ${Utils.capitalize(service)}`}
                                key={service}
                                />
                        );
                    })}
                </div>

                {services.length > 0 && Utils.hasPasswordService() ?
                    <div className="divider"><T>sign_up_with_email</T></div> : ''
                }

                {Utils.hasPasswordService() ?
                    <PasswordForm
                        type="register"
                        onError={ onError }
                        clearErrors={ clearErrors }
                      /> : ''
                }
            </div>);
    }
});

_.extend(Base2Ind,{RegisterForm});