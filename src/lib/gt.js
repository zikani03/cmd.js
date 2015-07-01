'use strict';

export const gt = {

    /**
     * Command: gt(3) - returns true for each value greater than an argument provided
     * @author Alexey Ershov
     */
    each : function (args, val) {
        for (var i = 0; i < args.length; i++) {
            if (val > args[i]) {
                return true;
            }
        }
        return false;
    }
};

