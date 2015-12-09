class Container extends React.Component
{
    render()
    {
        return (<div className="container">
            {this.props.children}
        </div>)
    }
}

_.extend(Base2Ind.Scaffolding,{Container});