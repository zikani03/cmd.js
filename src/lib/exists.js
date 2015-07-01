'use strict';

export const exists = {

    /**
     * Command: exists(null) === [false]
     *      exists.raw(null) === false
     * @author Nate Ferrero
     */
    args : [],
    each : function (args, val) {
        return val !== null && val !== undefined;
    }
};

