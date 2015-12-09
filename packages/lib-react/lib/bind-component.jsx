class BindComponent extends React.Component
{
    /**
     * No Autobinding:
     * Methods follow the same semantics as regular ES6 classes, meaning that they don't automatically bind this to the instance.
     * https://facebook.github.io/react/docs/reusable-components.html
     *
     * Solution:
     * http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes
     * "we've reduced the tedium of binding multiple instance methods to `this` by writing a `_bind` helper method in our `BaseComponent`"
     * @param methods
     * @private
     */
    _bind(...methods)
    {
        methods.forEach((method) =>
        {
            this[method] = this[method].bind(this);
        });
    }
}

_.extend(Base2Ind.Classes,{BindComponent});