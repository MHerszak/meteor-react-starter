/**
 * @namespace for modules
 * @type {{}}
 */
Base2Ind.modules = {};
/**
 * Modules to insert components in specific zones in your app's layout.
 * @namespace Base2Ind.modules
 *
 * @type {{add: (function(string, ({template: string, order: number}|Object[]))), remove: (function(string, string)), removeAll: (function(string)), get: (function(string): Object[]), addRoute: (function(string, string, string))}}
 */
Base2Ind.modules =
{
    /**
     * Add a module to a template zone
     * @param {string} zone - The name of the zone
     * @param {Object|Object[]} module - The module object (or an array of modules)
     * @param {string} module.template - The template to include
     * @param {number} module.order - The order of the template in the zone
     *
     * @example
     * Base2Ind.modules.add("hero", {
     *   template: "newsletterBanner",
     *   order: 10,
     *   only: ["postsDefault"]
     * });
     */
    add(zone, module)
    {
        // if module zone array doesn't exist yet, initialize it
        if (typeof Base2Ind.modules[zone] === "undefined") {
            Base2Ind.modules[zone] = [];
        }

        if (Array.isArray(module)) {

            var modules = module; // we're dealing with an Array, so let's add an "s"
            modules.forEach( function (module) {
                Base2Ind.modules[zone].push(module);
            });

        } else {

            Base2Ind.modules[zone].push(module);

        }
    },

    /**
     * Remove a module from a zone
     * @param {string} zone - The name of the zone
     * @param {string} template - The name of the template to remove
     */
    remove(zone, template)
    {
        Base2Ind.modules[zone] = _.reject(Base2Ind.modules[zone], function (module) {
            return module.template === template;
        });
    },

    /**
     * Removes all modules from a zone
     * @param {string} zone - The name of the zone
     */
    removeAll(zone)
    {
        Base2Ind.modules[zone] = [];
    },

    /**
     * Retrieve an array containing all modules for a zone
     * @param {string} zone - The name of the zone
     * @returns {Object[]} Returns a sorted array of the zone's modules
     */
    get(zone)
    {
        return _.sortBy(Base2Ind.modules[zone], "order");
    },

    /**
     * Add a route to the list of routes a module should be displayed on
     * @param {string} zone - The name of the zone
     * @param {string} template - The name of the module
     * @param {string} route - The name of the route on which to display the module
     */
    addRoute(zone, template, route)
    {
        _.findWhere(Base2Ind.modules[zone], {template: template}).only.push(route);
    }
};