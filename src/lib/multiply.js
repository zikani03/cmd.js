'use strict';

export const multiply = {

    /**
     * Command: multiply(1)(5) - multiplies each value by all args
     * @author Nate Ferrero
     */
    each : function (args, val) {
        args.forEach(function (arg) {
            val *= arg;
        });
        return val;
    }
};

