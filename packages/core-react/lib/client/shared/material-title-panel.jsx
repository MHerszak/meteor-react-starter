const {CustomTheme} = Base2Ind.Theme;

const stylesMTP = {
    root: CustomTheme.font,

    header: CustomTheme.header,
};

const MaterialTitlePanel = (props) => {
    const rootStyle = props.style ? {...stylesMTP.root, ...props.style} : stylesMTP.root,
        user = Meteor.user(),
        gravatar = props.gravatar ? <Gravatar email="michel.herszak@gmail.com" /> : <div></div>;

    return (
        <div style={rootStyle}>
            <div style={stylesMTP.header}>
                {gravatar}
                {props.title}</div>
            {props.children}
        </div>
    );
};

_.extend(Base2Ind.Layout,{MaterialTitlePanel});