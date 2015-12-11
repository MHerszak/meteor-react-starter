/**
 * Menus namespace
 * @namespace Base2Ind.menuItems
 */
Base2Ind.menuItems =
{
    /**
     * Add one or more items to a menu
     * @param {string} menu - The name of the menu
     * @param {Object|Object[]} item - The menu item object (or an array of items)
     *
     * @example <caption>Using a named route</caption>
     * Base2Ind.menuItems.add("viewsMenu", {
     *   route: 'postsDaily',
     *   label: 'daily',
     *   description: 'day_by_day_view'
     * });
     *
     * @example <caption>Using a route function</caption>
     * Base2Ind.menuItems.add("userMenu", {
     *   route: function () {
     *     return FlowRouter.path('user_profile', {_idOrSlug: Meteor.user().telescope.slug});
     *   },
     *   label: 'profile',
     *   description: 'view_your_profile'
     * });
     *
     */
    add(menu, item)
    {
        if (typeof Base2Ind.menuItems[menu] === "undefined") {
            Base2Ind.menuItems[menu] = [];
        }

        if (Array.isArray(item)) {

            var items = item; // we're dealing with an Array, so let's add an "s"
            items.forEach( function (item) {
                Base2Ind.menuItems[menu].push(item);
            });

        } else {

            Base2Ind.menuItems[menu].push(item);

        }
    },

    /**
     * Remove an item from a menu
     * @param {string} menu - The name of the menu
     * @param {string} label - The label of the item to remove
     */
    remove(menu, label) {
        Base2Ind.menuItems[menu] = _.reject(Base2Ind.menuItems[menu], function (menu) {
            return menu.label === label;
        });
    },

    /**
     * Remove all items from a menu
     * @param {string} menu - The name of the menu
     */
    removeAll(menu)
    {
        Base2Ind.menuItems[menu] = [];
    },

    /**
     * Retrieve an array containing all items for a menu
     * @param {string} menu - The name of the menu
     */
    get(menu)
    {
        return _.sortBy(Base2Ind.menuItems[menu], "order");
    }
};