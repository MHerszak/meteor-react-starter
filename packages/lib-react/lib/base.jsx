/**
 * Render helper. This makes sure it returns always the same render function
 * @type {{render: (function(*=, *))}}
 */
Base2Ind.Helper =
{
    render(layout,view)
    {
        return ReactLayout.render( layout, {content(){ return (view) }} );
    }
}

SimpleSchema.extendOptions({
    private: Match.Optional(Boolean),
    editable: Match.Optional(Boolean),  // editable: true means the field can be edited by the document's owner
    hidden: Match.Optional(Boolean),     // hidden: true means the field is never shown in a form no matter what
    editableBy: Match.Optional([String]),
    publishedTo: Match.Optional([String]),
    optional: Match.Optional(Boolean),
    required: Match.Optional(Boolean), // required: true means the field is required to have a complete profile
    public: Match.Optional(Boolean), // public: true means the field is published freely
    profile: Match.Optional(Boolean), // profile: true means the field is shown on user profiles
    template: Match.Optional(String), // template used to display the field
    editableBy: Match.Optional(String),

    autoform: Match.Optional(Object),
    group:Match.Optional(String),
    instructions: Match.Optional(String),
    class: Match.Optional(String),

});