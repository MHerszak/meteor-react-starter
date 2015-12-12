let {Utils} = Base2Ind.Helper;

/*import Utils from '../Utils';
import i18n from '{universe:i18n}';*/

//instance of translate component in "accounts-ui" namespace
const T = _i18n.createComponent(_i18n.createTranslator('accounts-ui'));

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
                    className="ui fluid negative disabled button"
                    style={{marginBottom: 10}}>
                    <i className="warning circle icon"></i> {this.state.error}
                </button>
            );
        }

        if (this.state.loading) {
            return (
                <button
                    className={`ui fluid button ${service} loading`}
                    style={{marginBottom: 10}}>
                    <T>loading</T>
                </button>
            );
        }

        return (
            <button
                className={`ui fluid button ${service}`}
                style={{marginBottom: 10}}
                onClick={this.handleClick}>
                <i className={`${service} icon`}></i> {this.props.text}
            </button>
        );
    }
});

_.extend(Base2Ind,{OAuthButton});