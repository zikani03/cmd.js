'use strict';

export const divide = {

    /**
     * Command: divide(1)(5) - divides each value by all args
     * @author Nate Ferrero
     */
    each : function (args, val) {
        args.forEach(function (arg) {
            val /= arg;
        });
        return val;
    }
};

