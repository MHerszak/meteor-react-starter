Row = class Row extends React.Component
{
    render()
    {
        return (<div className="row">
            {this.props.children}
        </div>)
    }
}