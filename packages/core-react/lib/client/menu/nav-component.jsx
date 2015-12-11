const {Styles} = MUI;
const {ThemeManager,
    Colors} = Styles;
const Menu = MUI.Libs.Menu;
const LinkMenuItem = MUI.Libs.LinkMenuItem;
const {CustomTheme} = Base2Ind.Theme;
/**
 <template name="admin_menu">
 {{#if isAdmin}}
 {{> menuComponent menuName="admin" menuType="list" menuItems=adminMenuItems}}
 {{/if}}
 </template>

 <a href="index.html" style={stylesSC.sidebarLink}>Home</a>

 */
class NavComponent extends React.Component
{
    constructor(props)
    {
        super(props)
    }

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {

        this.state = {
            muiTheme: ThemeManager.getMuiTheme(CustomTheme)
        }

        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });

        this.setState({muiTheme: newMuiTheme});
    }

    _getMenuItems()
    {
        return Base2Ind.menuItems.get(this.props.navName);
    }

    shouldComponentUpdate(nextProps,nextStat)
    {
        return nextProps.navName !== this.props.navName || nextStat.muiTheme !== this.props.muiTheme;
    }

    render()
    {
        let selectedIndex = this.props.selectedIndex;
        //let styles = this.getStyles();

        let menuItems = this._getMenuItems();

        let navigation = menuItems.map(function (obj,ind) {
            let route = obj.route;
            let text = obj.label;

            let linkMenuItem = (<LinkMenuItem
                key={ind}
                index={ind}
                payload={route}
                text={text} />);
            return linkMenuItem;
        });
        return(<div>
            {navigation}
        </div>)
    }
}

NavComponent.propTypes = {
    navName:React.PropTypes.string.required,
    menuType:React.PropTypes.string,
    /*menuItems:React.PropTypes.array,*/
    muiTheme:React.PropTypes.object,
}

NavComponent.childContextTypes = {
    muiTheme: React.PropTypes.object,
}

_.extend(Base2Ind.Components,{NavComponent});