Base2Ind.fluxUtils = {
    /**
     * Add change listener to components
     * @param Component
     * @param stores
     * @param getStateFromStores
     * @returns {*}
     */
    connectToStores(Component, stores, getStateFromStores)
    {
        return class StoreConnector extends Component
        {
            getInitialState() {
                return getStateFromStores(this.props);
            }

            componentDidMount() {
                stores.forEach(store =>
                    store.addChangeListener(this.handleStoresChanged)
                );
            }

            componentWillUnmount() {
                stores.forEach(store =>
                    store.removeChangeListener(this.handleStoresChanged)
                );
            }

            handleStoresChanged() {
                if (this.isMounted()) {
                    this.setState(getStateFromStores(this.props));
                }
            }

            render()
            {
                return (<Component {...this.props} {...this.state} />);
            }
        };

        return StoreConnector;
    }
}