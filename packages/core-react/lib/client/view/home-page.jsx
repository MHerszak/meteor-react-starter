/**
 * Dependent on base2ind:lib-react
 *
 * @type {{}}
 */
const {BindComponent} = Base2Ind.Classes;
const {Col,
    Container} = Base2Ind.Scaffolding;
/**
 * Basis for the home page. Should be very generic.
 */
class HomePage extends BindComponent
{
    constructor(props)
    {
        super(props);
        /**
         * Bind @private functions
         */
        this._bind(
            '_handleUserInput'
        );

        /**
         * Set default states when component gets created.
         * @type {{filterText: string}}
         */
        this.state ={
            filterText: "",
            input1: ""
        }
    }

    /**
     * Is used to filter names in an array.
     * @param filterText
     * @private
     */
    _handleUserInput(filterText)
    {
        this.setState({
            filterText: filterText
        });
    }

    render()
    {
        return(<Container>
        <Col l={12}>
            <h5 className="center-align">{this.props.headline}</h5>
            <SearchBar
                filterText={this.state.filterText}
                onUserInput={this._handleUserInput} />
        </Col>
        </Container>);
    }
}

HomePage.PropTypes ={
    headline:React.PropTypes.string,
}

_.extend(Base2Ind.Views,{HomePage});