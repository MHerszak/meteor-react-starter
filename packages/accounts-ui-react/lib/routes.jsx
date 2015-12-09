
FlowRouter.route('/login', {
    name:'login',
    action: function(params, queryParams) {

        ReactLayout.render(App, {
            content()
            {
                return (<div>
                    <ComboBox />
                </div>)
            }
        });
    }
});