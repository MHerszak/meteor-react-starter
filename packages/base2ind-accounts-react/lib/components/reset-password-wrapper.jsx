let {Utils} = Base2Ind.Helper;
//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

ResetPasswordBox = React.createClass({
    displayName: 'ResetPasswordBox',
    mixins: [ReactMeteorData],
    propTypes: {
        registerLink: React.PropTypes.string
    },
    getMeteorData () {
        return {
            user: Meteor.user()
        };
    },
    getInitialState () {
        return {
            loading: false,
            error: null,
            emailSent: false
        };
    },
    handleSubmit (e) {
        e.preventDefault();

        let email = this.refs.email.value;

        if (!email) {
            this.setState({error: _i18n.__(NAMESPACE, 'you_need_to_provide_email')});
            return;
        }

        this.setState({
            loading: true,
            error: null
        });

        Accounts.forgotPassword({email}, err => {
            if (err) {
                this.setState({
                    error: err.reason || err.message,
                    loading: false
                });
                return;
            }

            this.setState({
                error: null,
                loading: false,
                emailSent: true
            });
        });
    },
    renderErrorMessages() {
        if (typeof(this.state.error) ===  'string') {
            let errors = [];
            errors.push(this.state.error);
            return <ErrorMessages errors={ errors } />
        }
    },
    render () {
        if (this.data.user) {
            return <LoggedIn />;
        }

        if (this.state.emailSent) {
            return (
                <div className="ui large top attached segment">
                    <h2 className="ui center aligned dividing header"><T>email_sent</T></h2>
                    <T>check_your_inbox_for_further_instructions</T>
                </div>
            );
        }

        return (
            <div>
                <div className="ui large top attached segment">

                    <h2 className="ui center aligned dividing header"><T>reset_password</T></h2>

                    <form onSubmit={this.handleSubmit}
                          className={'ui form' + (this.state.loading ? ' loading' : '')}
                          ref="form">

                        <div className="required field">
                            <label><T>your_email</T></label>

                            <div className="ui fluid input">
                                <input type="email"
                                       placeholder={_i18n.__(NAMESPACE, 'email')}
                                       ref="email"
                                    />
                            </div>
                        </div>

                        <button type="submit"
                                className="ui fluid large primary button">
                            <T>send_reset_link</T>
                        </button>
                    </form>
                </div>

                {this.props.registerLink ?
                    <div className="ui large bottom attached info icon message">
                        <i className="user icon"></i>
                        <T>dont_have_an_account</T>
                        <a href={this.props.registerLink}>&nbsp;<T>register_here</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
            </div>
        );
    }
});

_.extend(Base2Ind,{ResetPasswordBox});