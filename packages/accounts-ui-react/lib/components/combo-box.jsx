let {Utils} = Base2Ind.Helper;
//instance of translate component in "accounts-ui" namespace
const T = _i18n.createComponent(_i18n.createTranslator('accounts-ui'));

class Login extends React.Component{
    render()
    {
        return(
            <LoginForm
                onError={ Utils.onError.bind(this) }
                clearErrors={ Utils.clearErrors.bind(this) }
            />
        )
    }
}

Login.displayName = 'Login';

ComboBox = React.createClass({
    displayName: 'ComboBox',

    mixins: [ReactMeteorData],

    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },
    getInitialState () {
        return {
            errors: []
        };
    },
    renderErrorMessages() {
        if (this.state.errors.length) {
            return <ErrorMessages errors={ this.state.errors } />
        }
    },
    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        return (<div>
                <div className="ui large top attached segment">
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                            <h2 className="ui center aligned dividing header"><T>sign_in</T></h2>

                            <LoginForm
                                onError={ Utils.onError.bind(this) }
                                clearErrors={ Utils.clearErrors.bind(this) }
                            />
                        </div>
                        <div className="ui vertical divider">
                            <T>or</T>
                        </div>
                        <div className="column">
                            <h2 className="ui center aligned dividing header"><T>sign_up</T></h2>

                            <RegisterForm
                                onError={ Utils.onError.bind(this) }
                                clearErrors={ Utils.clearErrors.bind(this) }
                            />
                        </div>
                    </div>
                </div>

                {this.props.resetLink ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>
                        <T>forgot_your_password</T><a href={this.props.resetLink}>&nbsp;<T>click_to_reset</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
            </div>);
    }
});

_.extend(Base2Ind,{ComboBox});