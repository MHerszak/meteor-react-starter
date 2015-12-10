injectTapEventPlugin();

//const MenuItem = MUI.Libs.MenuItem;
const {CustomTheme} = Base2Ind.Theme;
//const {TopBar} = Base2Ind.Views;
//const {Container} = Base2Ind.Scaffolding;
const {SidebarContent,
    MaterialTitlePanel} = Base2Ind.Layout;

const {
    AppCanvas,
    Styles,
    Sidebar,
    } = MUI;

const { ThemeManager} = Styles;

const styles = {
    contentHeaderMenuLink: {
        textDecoration: 'none',
        color: 'white',
        padding: 8,
    },
    content: {
        padding: '16px',
    },
};

App = React.createClass({
    getInitialState() {
        return {docked: false, open: false};
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(CustomTheme)
        };
    },

    getInitialState() {
        return {
            muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(CustomTheme),
        };
    },

    componentWillMount() {
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, docked: mql.matches});
    },

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    },

    onSetOpen(open) {
        this.setState({open: open});
    },

    mediaQueryChanged() {
        this.setState({docked: this.state.mql.matches});
    },

    toggleOpen(ev) {
        this.setState({open: !this.state.open});

        if (ev) {
            ev.preventDefault();
        }
    },

    render() {
        const sidebar = <SidebarContent />;

        const contentHeader = (<span>
            {!this.state.docked &&<a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
                <span> meteor-react-starter</span>
      </span>);

        const sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen,
        };

        return (
        <AppCanvas>
            <Sidebar {...sidebarProps}>
                <MaterialTitlePanel title={contentHeader}>
                    <div style={styles.content}>
                        {this.props.content()}
                    </div>
                </MaterialTitlePanel>
            </Sidebar>
        </AppCanvas>
        );
    },
});
