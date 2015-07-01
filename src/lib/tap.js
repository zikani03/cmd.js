'use strict';

export const tap = {

    /**
     * Command: tap(function (x) { return 2 * x + 1; })(1, 2, 3, 4, 5) - returns [3, 5, 7, 9, 11]
     * @author Nate Ferrero
     */
    each : function (args, val) {
        args.forEach(function (arg) {
            val = arg(val);
        });
        return val;
    }
};