let {Utils} = Base2Ind.Helper;
let {LoggedIn} = Base2Ind.Components;
//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

RegisterBox = React.createClass({
    displayName: 'RegisterBox',
    propTypes: {
        loginLink: React.PropTypes.string
    },
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

        const { clearErrors, onError } = this.props;

        return (<div>
                <div className="ui large top attached segment">

                    <h2 className="ui center aligned dividing header">
                        <T>sign_up</T>
                    </h2>

                    <RegisterForm
                        onError={ Utils.onError.bind(this) }
                        clearErrors={ Utils.clearErrors.bind(this) }
                        />

                </div>

                {this.props.loginLink ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>
                        <T>already_have_an_account</T>
                        <a href={this.props.loginLink}>&nbsp;<T>click_to_login</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
        </div>);
    }
});

_.extend(Base2Ind,{RegisterBox});