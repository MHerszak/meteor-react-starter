const {CustomTheme} = Base2Ind.Theme; // from core package
const {StoreMixin } = Base2Ind.Mixins; // from lib package
const {_LoginStore} = Base2Ind.Store; // in this package
const {UserProfileGravatar} = Base2Ind.Components;

const stylesMTP =
{
    root: CustomTheme.font,

    header: CustomTheme.header,

    subHeader: CustomTheme.subHeader,
};

const MaterialTitlePanel = (props) =>
{
    const rootStyle = props.style ? {...stylesMTP.root, ...props.style} : stylesMTP.root,
        /**
         * Check for gravatar
         * @type {XML}
         */
        gravatar = props.gravatar ? <UserProfileGravatar /> : <div></div>,
        /**
         * TODO: Think of something that is not title
         * @type {string}
         */
        title = props.gravatar ? '' : props.title,
        /**
         * TODO: Build a better ThemeManager for this gravatar
         * @type {{}}
         */
        sub = props.gravatar ? {...stylesMTP.subHeader,...CustomTheme.headerCommon} : {...stylesMTP.header,...CustomTheme.headerCommon};

    return (
        <div style={rootStyle}>
            <div style={sub}>
                {gravatar}
                {title}
            </div>
            {props.children}
        </div>
    );
};

_.extend(Base2Ind.Layout,{MaterialTitlePanel});