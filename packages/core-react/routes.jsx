/**
 * Created by michelherszak on 08/12/15.
 */

let {HomePage} = Base2Ind.Views;

FlowRouter.route('/', {
    name:'home',
    action: function(params, queryParams) {

        ReactLayout.render(App, {
            content()
            {
                return (<div>
                    <HomePage
                        headline="Material design Components for React" />
                </div>);
            }
        });
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
        ReactLayout.render(App, {
            content()
            {
                let notFound = "not Found";
                return (<div>{notFound}</div>);
            }
        });
    }
};