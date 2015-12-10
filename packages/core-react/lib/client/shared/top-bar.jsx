const SvgIcons = MUI.Libs.SvgIcons;
const {
    AppBar,
    IconButton,
    } = MUI;
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
            rightItems = <div></div>;

        return (<AppBar
            title="Meteor-React-Starter"
            iconElementLeft={<IconButton onClick={this.props.onClick} >{LeftIcon}</IconButton>}
            iconElementRight={rightItems}>
        </AppBar>);
    }
}

_.extend(Base2Ind.Views,{TopBar});