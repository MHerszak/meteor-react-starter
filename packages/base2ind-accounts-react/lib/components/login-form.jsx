let {Utils} = Base2Ind.Helper;
//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

const style = {
    padding:120
}

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
        return (<div>
                <div>
                    {services.map(service => {
                        return (<div key={service} className={style}>
                            <OAuthButton
                                service={service}
                                /*text={`${_i18n.__(NAMESPACE, 'sign_in_with')} ${Utils.capitalize(service)}`}*/
                                text={`${Utils.capitalize(service)}`}
                                key={service}
                                />
                            </div>);
                    })}
                </div>

                {services.length > 0 && Utils.hasPasswordService() ?
                    <div className="divider"><T>sign_in_with_email</T></div> : ''
                }

                {Utils.hasPasswordService() ?
                    <PasswordForm
                        type="login"
                        onError={ onError }
                        clearErrors={ clearErrors }
                      /> : ''
                }

            </div>);
    }
});

_.extend(Base2Ind,{LoginForm});