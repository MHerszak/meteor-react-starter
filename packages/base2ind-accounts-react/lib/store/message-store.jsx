'use strict'

/**
 *
 * @type {{}}
 */
let {_AppDispatcher} = Base2Ind.Dispatcher;
/**
 *
 * @type {EventEmitter|*}
 */
let {EventEmitter} = Base2Ind.EventEmitter;

const CHANGE_EVENT = 'change';

let postInfo = {
    /**
     * TODO: Need some content
     */
    message:'',
    tags:[],
    ocation:''

}

class MessageStore extends EventEmitter
{
    /**
     * Constructor
     */
    constructor() {
        super();
        this._postInfo = Immutable.Map(postInfo);
    }

    /**
     * Get the users information.
     * @returns {*|4152}
     */
    getPostInfo()
    {
        return this._postInfo.toObject();
    }

    /**
     *
     * @param response
     */
    setPostInfo(response)
    {
        /**
         * In order to preserve userInfo and response, I need to combine both into a 3rd object
         */
        let res = _.extend({},postInfo,response),
            isIdentical = Immutable.is(this._userInfo, Immutable.Map(res));

        if (!isIdentical) {this._userInfo  = Immutable.Map(res);}
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
};

let _MessageStore = new DatabaseStore();

_MessageStore.dispatchToken = _AppDispatcher.register((payload) =>
{
    let action = payload.action,
        type   = '';

    switch(action.actionType)
    {
        case AppConstants.SOCIAL_POST_TO_FEED:
            /**
             * What should be stored and where?
             * @type {string}
             */
            _MessageStore.setPostInfo(action.data);
            type = AppConstants.SOCIAL_POST_TO_FEED;
            break;
        default:
            return true;
    }
    _MessageStore.emitChange(type);
    return true;
});

_.extend(Base2Ind.Store,{_MessageStore});