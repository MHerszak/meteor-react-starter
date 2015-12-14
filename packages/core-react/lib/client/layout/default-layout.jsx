injectTapEventPlugin();

const {CustomTheme} = Base2Ind.Theme;

const {SidebarContent,
    MaterialTitlePanel,
    Sidebar} = Base2Ind.Layout;

const {
    AppCanvas,
    Styles,
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

    mixins: [ReactMeteorData/*StylePropable*/],

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getMeteorData()
    {
        return {
            loggingIn: Meteor.loggingIn(),
            currentUser:Meteor.user(),
        };
    },

    loading() {
        return <div className="loading"></div>;
    },

    getInitialState() {
        return {
            docked: false,
            open: false,
            muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(CustomTheme),
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },

    //to update theme inside state whenever a new theme is passed down
    //from the parent / owner using context
    componentWillReceiveProps(nextProps, nextContext) {
        let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({muiTheme: newMuiTheme});
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

    getSpacing() {
        return this.state.muiTheme.rawTheme.spacing;
    },

    /*getStyles()
    {
        //const rawTheme = this.state.muiTheme.rawTheme;

        let style = {
            root:{
                backgroundColor: rawTheme.color,
            },
            menu: {
                overflowY: 'auto',
                overflowX: 'hidden',
                height: '100%',
                borderRadius: '0',
            },
            overlay: {
                /!*zIndex: rawTheme.zIndex.leftNavOverlay,*!/
                pointerEvents: this.state.open ? 'auto' : 'none', // Bypass mouse events when left nav is closing.
            },
            menuItem: {
                height: rawTheme.spacing.desktopLeftNavMenuItemHeight,
                lineHeight: rawTheme.spacing.desktopLeftNavMenuItemHeight + 'px',
            },
            rootWhenOpenRight: {
                left: 'auto',
                right: 0,
            },
        };

        return style;
    },*/

    render()
    {
        //let styles = this.getStyles();

        const sidebar = <SidebarContent />;

        const contentHeader = (<span>
            {!this.state.docked &&<a onClick={this.toggleOpen} href="#" style={styles.contentHeaderMenuLink}>=</a>}
                <span> title</span>
            <div>
        </div>
      </span>);

        const sidebarProps = {
            sidebar: sidebar,
            docked: this.state.docked,
            open: this.state.open,
            onSetOpen: this.onSetOpen
        };

        return (<div>
            <AppCanvas>
                <Sidebar {...sidebarProps}>
                    <MaterialTitlePanel title={contentHeader}>
                        <div style={styles.content}>
                            {this.props.content()}
                        </div>
                    </MaterialTitlePanel>
                </Sidebar>
            </AppCanvas>
        </div>);
    },
});
