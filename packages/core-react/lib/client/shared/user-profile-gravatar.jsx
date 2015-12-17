let UserProfileGravatar = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },

    render()
    {
        let user = this.data.currentUser;
        return (
            <div className="row">
                <div className="col">
                    <Gravatar email={User.ge}
                              shape="circle"
                              imgSrc={this.props.avatar} />
                </div>
                <div className="col">
                    <div>{this.props.username}</div>
                </div>
            </div>
        )
    }
});

_.extend(Base2Ind.Components,{UserProfileGravatar});