'use strict';

const {Paper} = MUI;

let PaperWrapper = React.createClass({

    /**
     * Save theme properties in this object.
     * @returns {{root: {padding: number}}}
     * @private
     */
    _getStyle()
    {
        let style =
        {
            root:{
                padding:20
            }
        };

        return style;
    },

    render()
    {
        let style = this._getStyle();

        return(<Paper>
            <div className="center" style={style.root}>
                {this.props.children}
            </div>
        </Paper>);
    }
});

_.extend(Base2Ind.Components,{PaperWrapper});