'use strict';

export const gte = {

    /**
     * Command: gte(5) - returns true for each value greater or equal to an argument provided
     * @author Alexey Ershov
     */
    each : function (args, val) {
        for (var i = 0; i < args.length; i++) {
            if (val >= args[i]) {
                return true;
            }
        }
        return false;
    }
};

