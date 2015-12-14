let {Utils} = Base2Ind.Helper;

const {PaperWrapper} = Base2Ind.Components;

//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

ResetPasswordWrapper = React.createClass({
    displayName: 'ResetPasswordWrapper',
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
                <div>
                    <div className="center"><T>email_sent</T></div>
                    <T>check_your_inbox_for_further_instructions</T>
                </div>
            );
        }

        return (<PaperWrapper>
                <div className="center"><T>reset_password</T></div>

                <form onSubmit={this.handleSubmit}
                      className={'ui form' + (this.state.loading ? ' loading' : '')}
                      ref="form">

                    <label><T>your_email</T></label>

                    <input type="email"
                           placeholder={_i18n.__(NAMESPACE, 'email')}
                           ref="email" />

                    <button type="submit" className="btn btn-flat">
                        <T>send_reset_link</T>
                    </button>
                </form>

                {this.props.registerLink ?
                    <div>
                        <i className="user icon"></i>
                        <T>dont_have_an_account</T>
                        <a href={this.props.registerLink}>&nbsp;<T>register_here</T></a>
                    </div>
                    : ''}

                { this.renderErrorMessages() }
            </PaperWrapper>
        );
    }
});

_.extend(Base2Ind,{ResetPasswordWrapper});