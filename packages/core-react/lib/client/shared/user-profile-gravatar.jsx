let UserProfileGravatar = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            userId: Meteor.userId()
        };
    },

    render()
    {
        let email = Users.getEmailById(this.data.userId);

        return (
            <div className="row">
                <div className="col">
                    <Gravatar email={Users.getEmailById(this.data.userId)}
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