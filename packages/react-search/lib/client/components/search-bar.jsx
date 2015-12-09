const {AutoComplete} = MUI;
const {BindComponent} = Base2Ind.Classes;

SearchBar = class SearchBar extends BindComponent
{
    constructor(props)
    {
        super(props);
        this._bind('_handleChange');
        this.state={
            input1:""
        }
    }

    /**
     * Handle change and reverse data exchange
     * @private
     */
    _handleChange(e)
    {
        let filterText = ReactDOM.findDOMNode(this.refs.filterTextInput).value ?
            ReactDOM.findDOMNode(this.refs.filterTextInput).value : e.target.value;

        this.props.onUserInput(
            filterText
        );
    }

    render()
    {
        /**
         * This is only an example of how search could be implemented.
         *
         * AutoComplete.Item will be tunred into an array.
         */
        return (
            <div>
                <AutoComplete
                    fullWidth = {true}
                    showAllItems = {true}
                    dataSource={{
                        a:(<AutoComplete.Item primaryText={'a'} secondaryText="&#9786;" />),
                        divider:(<AutoComplete.Divider/>),
                        b:(<AutoComplete.Item primaryText={'b'} secondaryText="&#9885;" />),
                    }}
                    onUpdateInput={(t) => {console.log(t); this.setState({input1: [t, t+t, t+t+t]});}}
                    onNewRequest={(t, index) => {console.log('request:'+index);}} />
            </div>
        );
    }

    /*render()
    {
        return(<form>
            <input
                type="text"
                placeholder="Search..."
                ref="filterTextInput"
                onChange={this._handleChange}
            />
        </form>);
    }*/
};

SearchBar.propTypes = {
    filterText: React.PropTypes.string,
    onUserInput: React.PropTypes.func
}