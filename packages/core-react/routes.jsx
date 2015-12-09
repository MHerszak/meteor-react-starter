/**
 * Created by michelherszak on 08/12/15.
 */

let {HomePage} = Base2Ind.Views;

let styles = {
    height:100,
}

FlowRouter.route('/', {
    name:'home',
    action: function(params, queryParams) {

        ReactLayout.render(App, {
            content()
            {
                return (<div style={styles}>
                    <HomePage
                        headline="Material design Components for React" />
                </div>);
            }
        });
    }
});