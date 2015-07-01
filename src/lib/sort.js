'use strict';

export const sort = {
    /**
     * Dependencies
     */

    /**
     * Command: sort(function (val) {
     *   return val;
     * })(3, 2, 1) === [1, 2, 3]
     * @author Nate Ferrero
     */
    all : function (args, vals) {
        // cmd.use('compare', 'clone');
        var direction = 1;
        var local = cmd.clone.with(args);

        if (local && local.length && typeof local[0] === 'number') {
            direction = local.shift();
        }

        if (direction === 0) {
            return vals;
        }

        return vals.sort(function (a, b) {
            if (!local.length) {
                return direction * cmd.compare(a, b);
            }
            return direction * cmd.compare(
                local.map(function (arg) {
                    if (arg && arg.constructor === cmd.constructor) {
                        return arg.raw(a);
                    }
                    return (arg.raw || arg)(a);
                }),
                local.map(function (arg) {
                    if (arg && arg.constructor === cmd.constructor) {
                        return arg.raw(b);
                    }
                    return (arg.raw || arg)(b);
                })
            );
        });
    },

    argSets : {
        /**
         * Argset for ascending sort
         */
        asc: [],

        /**
         * Argset for descending sort
         */
        desc: [-1]
    }
};

