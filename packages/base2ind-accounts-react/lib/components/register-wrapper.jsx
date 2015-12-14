let {Utils} = Base2Ind.Helper;
const {LoggedIn,
    PaperWrapper
    } = Base2Ind.Components;
//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

RegisterWrapper = React.createClass({
    displayName: 'RegisterWrapper',
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

        return (<PaperWrapper>
                <div className="ui large top attached segment">

                    <div className="center">
                        <T>sign_up</T>
                    </div>

                    <RegisterForm
                        onError={ Utils.onError.bind(this) }
                        clearErrors={ Utils.clearErrors.bind(this) }
                        />

                </div>

                {this.props.loginLink ?
                    <div>
                        <i className="user icon"></i>
                        <T>already_have_an_account</T>
                        <a href={this.props.loginLink}>&nbsp;<T>click_to_login</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
        </PaperWrapper>);
    }
});

_.extend(Base2Ind,{RegisterWrapper});