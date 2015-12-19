let {Utils} = Base2Ind.Helper;
let {Form,
    Input,
    Button} = FormComponents;
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

const SignIn = React.createClass({
    propTypes: {
        errors: React.PropTypes.array
    },

    fields() {
        return [
            {
                name: 'username-or-email',
                placeholder: _i18n.__(NAMESPACE, 'text_input_username_or_email'),
                visible() {
                    return _.contains(
                        ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],
                        AccountsUI.passwordSignupFields());
                }
            },
            {
                name: 'username',
                placeholder: _i18n.__(NAMESPACE, 'text_input_username'),
                visible() {
                    return AccountsUI.passwordSignupFields() === "USERNAME_ONLY";
                }
            },
            {
                name: 'email',
                placeholder: _i18n.__(NAMESPACE, 'email'),
                type: 'email',
                visible() {
                    return AccountsUI.passwordSignupFields() === "EMAIL_ONLY";
                }
            },
        ];
    },

    errors() {
        const errors = this.props.errors.map((item, i) => {
            const message = (typeof item === 'string') ? item : item.reason;
            return <p key={i}>{_i18n.__(NAMESPACE, message)}</p>;
        });

        return (! _.isEmpty(errors)) ? <Alert>{errors}</Alert> : null;
    },

    handleSubmit(e) {
        e.preventDefault();

        const user = (e.target['username-or-email'] &&
            e.target['username-or-email'].value) ||
            (e.target.username && e.target.username.value) ||
            (e.target.email && e.target.email.value);

        return this.props.handleSubmit(user, e.target.password.value);
    },

    componentDidMount() {
        this.refs.nameInput.getDOMNode().focus();
    },

    renderInputs() {
        return this.fields().map((item, i) => {
            return (item.visible()) ? <Input key={i} {...item} /> : null;
        })
    },

    render()
    {
        return (<div>
            <Form id="form-sign-in" onSubmit={this.handleSubmit}>

                {this.errors()}

                {this.renderInputs()}

                <InputPassword />

                <Button type="submit"
                             className="btn btn-primary btn-block">
                    {_i18n.__(NAMESPACE, 'sign_in')}
                </Button>
            </Form>

            <a href="/sign-up" className="btn btn-flat" >
                {_i18n.__(NAMESPACE, 'sign_up')}
            </a>
        </div>);
    }
});

const InputPassword = React.createClass({
    render() {
        return (
            <div className="form-group">
                <Input type="password"
                       id="password"
                       className="form-control"
                       name="password"
                       placeholder={_i18n.__(NAMESPACE, 'text_input_password')} />

                <a href="/forgot-password" className="right">
                    {_i18n.__(NAMESPACE, 'text_forgot_password')}
                </a>
            </div>
        )
    }
});

SignInContainer = React.createClass({

    getInitialState() {
        return {
            errors: []
        }
    },

    handleSubmit(user, password) {
        const errors = [];
        if (_.isEmpty(user)) errors.push('error_user_required');
        if (_.isEmpty(password)) errors.push('error_password_required');
        this.setState({ errors });
        if (errors.length > 0) return;

        Meteor.loginWithPassword(user, password, (error) => {
            if (error) {
                this.setState({ errors: [error] });
            } else {
                console.log('sign-in success');

                const { location } = this.props

                if (location.state && location.state.nextPathname) {
                    this.history.replaceState(null, location.state.nextPathname)
                } else {
                    this.history.replaceState(null, '/')
                }
                console.log('history state replace');
            }
        });
    },

    render() {
        return <SignIn errors={this.state.errors}
                       handleSubmit={this.handleSubmit} />
    }
});
