const {CustomTheme} = Base2Ind.Theme;

const stylesMTP = {
    root: CustomTheme.font,

    header: CustomTheme.header,
};

const MaterialTitlePanel = (props) => {
    const rootStyle = props.style ? {...stylesMTP.root, ...props.style} : stylesMTP.root;

    return (
        <div style={rootStyle}>
            <div style={stylesMTP.header}>{props.title}</div>
            {props.children}
        </div>
    );
};

_.extend(Base2Ind.Layout,{MaterialTitlePanel});