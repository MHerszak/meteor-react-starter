/**
 * This limits the redirect to routes which are part of the public group,
 * so if the user in question navigates to a different private route (profile, for example),
 * they'll be unaffected.
 */
Accounts.onLogin(function () {
    /*if (FlowRouter.current().route.group.name === 'public') {
        FlowRouter.go('dashboard')
    }*/
});

/*
Accounts.onLogin(function() {
    var redirect;
    redirect = Session.get("redirectAfterLogin");
    if (redirect != null) {
        if (redirect !== '/login') {
            return FlowRouter.go(redirect);
        }
    }
});*/

Accounts.onCreateUser(function(options, user)
{
    console.log(options, user);

    if(!options || !user) {
        throw new Meteor.Error('Problem to create new user', 'Options or user is empty.');
        return;
    }

    var userEmail = Base2Ind.utils.determineEmail(user);

    if(userEmail){return};

    if(typeof(user.services.facebook) !== "undefined")
    {
        var result;
        result = HTTP.get("https://graph.facebook.com/me", {
            params: {
                access_token: user.services.facebook.accessToken,
                fields: ['picture','last_name','first_name','email']
            }
        });

        if (result.error) {
            throw new Meteor.Error('An error occurred when trying to obtain data from Facebook: '+result.error);
        }

        var fbProfile = _.pick(result.data,
            "id",
            "email",
            "name",
            "first_name",
            "last_name",
            "profile.name");

        var profile =
        {
            accountToken: "",
            completed: true,
            userProfile: {
                first_name: fbProfile["first_name"],
                last_name: fbProfile["last_name"],
                bio: "",
                picture: "https://graph.facebook.com/" + fbProfile["id"] + "/picture/?width=500&height=500"
            }
        };

        var user_add =
        {
            completed: false,
            username: fbProfile["profile.name"],
            email: fbProfile["email"],
            profile: profile,
        };
    }
    else
    {
        var user_add =
        {
            completed: false,
            username: options.username,
            email: options.email,
            profile: options.profile,
        };
    }


    _.extend(user,user_add);

    return user;
});