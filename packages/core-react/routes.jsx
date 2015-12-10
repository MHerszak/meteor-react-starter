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