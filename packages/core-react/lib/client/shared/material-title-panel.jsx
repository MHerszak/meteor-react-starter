const {CustomTheme} = Base2Ind.Theme;

const stylesMTP =
{
    root: CustomTheme.font,

    header: CustomTheme.header,

    subHeader: CustomTheme.subHeader,
};

const MaterialTitlePanel = (props) => {
    const rootStyle = props.style ? {...stylesMTP.root, ...props.style} : stylesMTP.root,
        user = Meteor.user(),
        gravatar = props.gravatar ? <Profile username="Michel"/> : <div></div>,
        title = props.gravatar ? '' : props.title,
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

let Profile = React.createClass({

    render: function() {
        return (
            <div className="row">
                <div className="col">
                    <Gravatar email="michel.herszak@gmail.com"
                              shape="circle"
                              imgSrc={this.props.avatar} />
                    <Bio text={this.props.bio} />
                </div>
                <div className="col">
                    <div>{this.props.username}</div>
                </div>
            </div>
        )
    }
});

let Bio = React.createClass({
    render()
    {
        return (
            <div className="Bio">
                <p className="Bio-text">{this.props.text}</p>
            </div>
        )
    }
});