/**
 * "Note that this is just one possible way of replacing mixins with composition.
 * See the notes at the end of the article for other approaches.Suppose that you have a mixin
 * that subscribes to the specified Flux Stores and triggers changes in component’s state."
 * Source: https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.4jrftcrt1
 *
 * @param stores
 * @returns {*}
 * @constructor
 */
function StoreMixin(...stores)
{
    var Mixin = {
        getInitialState() {
            return this.getStateFromStores(this.props);
        },
        componentDidMount() {
            stores.forEach(store =>
                store.addChangeListener(this.handleStoresChanged)
            );
            this.setState(this.getStateFromStores(this.props));
        },
        componentWillUnmount() {
            stores.forEach(store =>
                store.removeChangeListener(this.handleStoresChanged)
            );
        },
        handleStoresChanged() {
            if (this.isMounted()) {
                this.setState(this.getStateFromStores(this.props));
            }
        }
    };
    return Mixin;
}

_.extend(Base2Ind.Mixins,{StoreMixin});