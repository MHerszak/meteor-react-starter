let {Utils} = Base2Ind.Helper;

//instance of translate component in namespace
const T = _i18n.createComponent(_i18n.createTranslator(NAMESPACE));

OAuthButton = React.createClass({
    displayName: 'OAuthButton',
    propTypes: {
        service: React.PropTypes.string.isRequired,
        text: React.PropTypes.string,
        onLogin: React.PropTypes.func
    },
    getInitialState () {
        return {
            loading: false,
            error: null
        };
    },
    handleClick () {
        this.setState({loading: true});

        Utils.performOAuthLogin(this.props.service, err => {
            this.setState({
                loading: false,
                error: err ? err.message : null
            });
        });
    },
    render () {
        let service = this.props.service;

        // some meteor -> semantic name mappings for nice styling
        if (service === 'google') {
            service += ' plus';
        }

        if (this.state.error) {
            return (
                <button
                    className="btn btn-flat"
                    style={{marginBottom: 10}}>
                    <i className="warning circle icon"></i> {this.state.error}
                </button>
            );
        }

        if (this.state.loading) {
            return (
                <button
                    className={`btn btn-flat ${service} loading`}
                    style={{marginBottom: 10}}>
                    <T>loading</T>
                </button>
            );
        }

        let text = this.props.text ? "icon " + this.props.text : this.props.text;

        return (
            <button
                className={`btn btn-flat ${service}`}
                style={{marginBottom: 10}}
                onClick={this.handleClick}>
                {text}
            </button>
        );
    }
});

_.extend(Base2Ind,{OAuthButton});