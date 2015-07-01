'use strict';

export const equals = {

    /**
     * Command: equals(5)(5) === [true]
     *      equals(5).raw(5) === true
     * @author Nate Ferrero
     */
    each : function (args, val) {
        for (var i = 0; i < args.length; i++) {
            if (val === args[i]) {
                return true;
            }
        }
        return false;
    }
};

