
/*var fs; = Npm.require('fs');

console.log('fs: ', fs);*/

/**
 * Function to add services to database collection.
 * @param service
 * @param clientId
 * @param secret
 * @returns {*|any|483|547|607}
 */
var createServiceConfiguration = function(service, clientId, secret) {
    var config;

    ServiceConfiguration.configurations.remove({
        service: service
    });

    config = {
        facebook: {
            service: service,
            appId: clientId,
            secret: secret,
            forceApprovalPrompt:true,
            requestPermissions:['email', 'public_profile', 'user_friends','publish_actions'],
            scope:['email', 'public_profile', 'user_friends','publish_actions'],
        },
        twitter: {
            service: service,
            consumerKey: clientId,
            secret: secret,
            loginStyle: "popup",
        }
    };

    switch (service) {
        case 'facebook':
            return ServiceConfiguration.configurations.insert(config.facebook);
        case 'twitter':
            return ServiceConfiguration.configurations.insert(config.twitter);
        default:
            // nothing to return
    }
};

createServiceConfiguration('facebook', '818870171524006', '5d1dc6be72584889cfa12561be626f12');
createServiceConfiguration('twitter', "6reG20D3QmH0SjLOD1VVlajuM", "B0xwVB4qfHRhCG6bLC0UWDkFjfMwLOFhp4KQocFWW6rQ7ThhQA");