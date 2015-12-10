const {MaterialTitlePanel} = Base2Ind.Layout;

const stylesSC = {
    sidebar: {
        width: 256,
        height: '100%',
    },
    sidebarLink: {
        display: 'block',
        padding: '16px 0px',
        color: '#757575',
        textDecoration: 'none',
    },
    divider: {
        margin: '8px 0',
        height: 1,
        backgroundColor: '#757575',
    },
    content: {
        padding: '16px',
        height: '100%',
        backgroundColor: 'white',
    },
};

const SidebarContent = (props) =>
{
    const style = props.style ? {...stylesSC.sidebar, ...props.style} : stylesSC.sidebar;

    const links = [];

    for (let ind = 0; ind < 2; ind++) {
        links.push(
            <a key={ind} href="#" style={stylesSC.sidebarLink}>Mock menu item {ind}</a>);
    }

    return (
        <MaterialTitlePanel title="Your Name" style={style}>
            <div style={stylesSC.content}>
                <a href="index.html" style={stylesSC.sidebarLink}>Home</a>
                <div style={stylesSC.divider} />
                {links}
            </div>
        </MaterialTitlePanel>
    );
};

_.extend(Base2Ind.Layout,{SidebarContent});