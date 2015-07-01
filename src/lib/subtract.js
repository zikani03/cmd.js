'use strict';

export const subtract = {

    /**
     * Command: subtract(1)(5) - subtracts args from each value
     * @author Nate Ferrero
     */
    each : function (args, val) {
        args.forEach(function (arg) {
            val -= arg;
        });
        return val;
    }
};

