/**
 * Render helper. This makes sure it returns always the same render function
 * @type {{render: (function(*=, *))}}
 */
Base2Ind.Helper = {
    render(layout,view)
    {
        return ReactLayout.render( layout, {content(){ return (view) }} );
    }
}