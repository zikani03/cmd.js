'use strict';

export const max = {

    /**
     * Command: max(1, 2, 3, 4, 5) - returns the maximum value
     * @author Nate Ferrero
     */
    args : [],
    all : function (args, vals) {
        return Math.max.apply(Math, vals);
    }
};

