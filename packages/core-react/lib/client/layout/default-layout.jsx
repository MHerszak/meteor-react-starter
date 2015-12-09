//app.jsx
injectTapEventPlugin();

const SvgIcons = MUI.Libs.SvgIcons;
const MenuItem = MUI.Libs.MenuItem;
const {BlueTheme} = Base2Ind;

const {
    AppCanvas,
    Avatar,
    AppBar,
    Styles,
    IconButton,
    LeftNav,
    IconMenu,
    } = MUI;
var { ThemeManager} = Styles;

/**
 * Build some sort for the menu. Or a hook system where
 * @type {*[]}
 */
menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { type: "SUBHEADER", text: 'Resources' },
    {
        type: "LINK",
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub'
    },
    {
        text: 'Disabled',
        disabled: true
    },
    {
        type: "LINK",
        payload: 'https://www.google.com',
        text: 'Disabled Link',
        disabled: true
    },
];

class TopBar extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            sideNavOpen: false
        }
    }

    render()
    {
        /**
         * RightMenu will become a module
         * @type {XML}
         */
        let LeftIcon = this.state.sideNavOpen ? <SvgIcons.NavigationClose /> : <SvgIcons.NavigationMenu />,
            rightItems = <IconMenu iconButtonElement={<IconButton><SvgIcons.NavigationMenu /></IconButton>}>
                <MenuItem key={0} index={0} primaryText="Refresh" />
                <MenuItem key={1} index={1} primaryText="Help" />
                <MenuItem key={2} index={2} primaryText="Sign out" />
            </IconMenu>;

        return (<AppBar
            title="Meteor-React-Starter"
            iconElementLeft={<IconButton onClick={this.props.onClick} >{LeftIcon}</IconButton>}
            iconElementRight={rightItems}>
        </AppBar>);
    }
}

App = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(BlueTheme)
        };
    },

    _handle()
    {
        this.refs.leftNav.toggle();
    },

    render()
    {
        return(<AppCanvas>
            <TopBar onClick={this._handle}/>
            <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />

            <div  className="spacer">
            {this.props.content()}
            </div>
        </AppCanvas>);
    }
});