const Menu = MUI.Libs.Menu;
const LinkMenuItem = MUI.Libs.LinkMenuItem;
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

    _getMenuItems()
    {
        return Base2Ind.menuItems.get(this.props.navName);
    }

    componentShouldUpdate()
    {

    }

    render()
    {
        let selectedIndex = this.props.selectedIndex;
        //let styles = this.getStyles();

        let menuItems = this._getMenuItems();

        let navigation = menuItems.map(function (obj,ind) {
            console.log(obj, ind);
            let route = obj.route;
            let text = obj.label;

            let linkMenuItem = (<LinkMenuItem
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
}

_.extend(Base2Ind.Components,{NavComponent});