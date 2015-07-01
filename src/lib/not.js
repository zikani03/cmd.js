'use strict';

export const not = {

    /**
     * Command: not('red') === [false]
     *      not.raw('red') === false
     * @author Nate Ferrero
     */
    args : [],
    each : function (args, val) {
        return val === false || val === null || val === undefined;
    }
};

