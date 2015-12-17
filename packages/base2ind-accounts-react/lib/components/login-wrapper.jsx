const {LoggedIn,
    PaperWrapper
    } = Base2Ind.Components;

const {Utils} = Base2Ind.Helper;

//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

LoginWrapper = React.createClass({
    displayName: 'LoginWrapper',

    propTypes: {
        registerLink: React.PropTypes.string,
        resetLink: React.PropTypes.string
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

        return (<PaperWrapper>

                <span style={{padding:20}}><T>sign_in</T></span>

                <LoginForm
                    onError={ Utils.onError.bind(this) }
                    clearErrors={ Utils.clearErrors.bind(this) } />

                {(this.props.registerLink || this.props.resetLink) ?
                    <div>

                        <div>
                            <div>
                                {this.props.registerLink ?
                                    <div className="item"><T>dont_have_an_account</T><a href={this.props.registerLink}><T>register_here</T></a></div>
                                    : ''}
                                {this.props.resetLink ?
                                    <div className="item"><T>forgot_your_password</T><a href={this.props.resetLink}><T>click_to_reset</T></a></div>
                                    : ''}
                            </div>
                        </div>
                    </div>
                    : ''}

                { this.renderErrorMessages() }

        </PaperWrapper>);
    }
});

_.extend(Base2Ind,{LoginWrapper});