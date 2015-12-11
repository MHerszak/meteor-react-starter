/**
 * Created by michelherszak on 08/12/15.
 */

let {HomePage} = Base2Ind.Views;

FlowRouter.route('/', {
    name:'home',
    action: function(params, queryParams) {

        Base2Ind.Helper.render(App,<HomePage headline="Material design Components for React" />);
    }
});

FlowRouter.notFound = {
    action: function() {
        if (Meteor.isClient) {
            DocHead.addMeta({
                name: "name",
                property: "prerender-status-code",
                content: "404"
            });
            DocHead.addMeta({
                name: "name",
                property: "robots",
                content: "noindex, nofollow"
            });
        }

        let notFound = "not Found";
        Base2Ind.Helper.render(App,<div>{notFound}</div>);
    }
};