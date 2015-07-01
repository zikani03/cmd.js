'use strict';

export const lt = {

    /**
     * Command: lt(3) - returns true for each value less than an argument provided
     * @author Alexey Ershov
     */
    each : function (args, val) {
        for (var i = 0; i < args.length; i++) {
            if (val < args[i]) {
                return true;
            }
        }
        return false;
    }
};

