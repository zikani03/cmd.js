'use strict';

export const do_ = {

    /**
     * Command: do(cmd.get('a'), cmd.get('b')).with({a: 1, b: 2}, {a: 3, b: 4}) === [[1, 2], [3, 4]]
     * @author Nate Ferrero
     */
    each : function (args, val) {
        /**
         * Run the given method for each argument
         */
        return args.map(function (arg) {
            if (arg && arg.constructor === cmd.constructor) {
                return arg.raw(val);
            }

            if (typeof arg === 'function') {
                return arg(val);
            }

            return arg;
        });
    }
};