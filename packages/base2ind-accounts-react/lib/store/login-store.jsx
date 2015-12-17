/**
 *
 * @type {{}}
 */
let {_AppDispatcher} = Base2Ind.Dispatcher;

/**
 *
 * @type {EventEmitter|*}
 */
let {EventEmitter } = Base2Ind.EventEmitter;

/**
 *
 * @type {string}
 */
const CHANGE_EVENT = 'change';

/**
 *
 * @type {{status: string, authResponse: {accessToken: string, signedRequest: string, userID: string}}}
 */
let auth = {
    status:'',
    authResponse:{
        accessToken   : '',
        signedRequest : '',
        userID        : ''
    }

};

class LoginStore extends EventEmitter
{
    constructor()
    {
        super();
        let _this = this;
        _this._auth = Immutable.fromJS({});
    }

    /**
     *
     * @returns {any|*}
     */
    getAuth()
    {
        return this._auth;
    }

    /**
     *
     * @param res
     */
    setAuth(res)
    {
        let isIdentical = Immutable.is(this._auth, Immutable.fromJS(res));

        if (!isIdentical)
        {
            this._auth = Immutable.fromJS(res);
        }
    }

    /**
     *
     * @param type
     */
    emitChange(type)
    {
        this.emit(CHANGE_EVENT,type);
    }

    /**
     *
     * @param callback
     */
    addChangeListener(callback)
    {
        this.on(CHANGE_EVENT, callback);
    }

    /**
     *
     * @param callback
     */
    removeChangeListener(callback)
    {
        this.removeListener(CHANGE_EVENT, callback);
    }

}

let _LoginStore = new LoginStore();

_LoginStore.dispatchToken = _AppDispatcher.register((payload) =>
{
    let action = payload.action,
        type   ='';

    switch(action.actionType)
    {
        case AppConstants.USER_LOGIN_SUCCESS:
            _LoginStore.setAuth(action.data);
            type = AppConstants.USER_LOGIN_SUCCESS;
            //connected
            break;
        case AppConstants.USER_LOGIN_FAIL:
            _LoginStore.setAuth(action.data);
            type = AppConstants.USER_LOGIN_FAIL
            //unknown
            break;
        default:
            return true;
    }

    _LoginStore.emitChange(type);

    return true;
});

_.extend(Base2Ind.Store,{_LoginStore});