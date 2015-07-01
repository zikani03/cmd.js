'use strict';

export const min = {

    /**
     * Command: min(1, 2, 3, 4, 5) - returns the minimum value
     * @author Nate Ferrero
     */
    args : [],
    all : function (args, vals) {
        return Math.min.apply(Math, vals);
    }
};

