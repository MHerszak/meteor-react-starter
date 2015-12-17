class AppDispatcher extends Dispatcher
{
    /**
     * Set a dispatcher
     * @param action
     */
    handleAction(action)
    {
        this.dispatch({
            source: 'API_ACTION',
            action: action
        });
    }
}

_AppDispatcher = new AppDispatcher();

_.extend(Base2Ind.Dispatcher,{_AppDispatcher});