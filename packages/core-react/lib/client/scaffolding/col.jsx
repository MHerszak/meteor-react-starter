class Col extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        let className = _.map(this.props, function (val,field)
        {
            return field !== "children" ? field + '' + val : "";
        });

        return (<div className={className.join(' ')}>
            {this.props.children}
        </div>)
    }
}

Col.propTypes = {
    l: React.PropTypes.number,
    align: React.PropTypes.string
}

Col.defaultProps = {
    l : 12,
    align : "center-align"
};

_.extend(Base2Ind.Scaffolding,{Col});