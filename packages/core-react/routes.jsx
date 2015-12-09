/**
 * Created by michelherszak on 08/12/15.
 */
FlowRouter.route('/', {
    name:'home',
    action: function(params, queryParams) {

        ReactLayout.render(App, {
            content()
            {
                return (<div>
                </div>)
            }
        });
    }
});