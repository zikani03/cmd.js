'use strict';

export const last = {

    /**
     * Command: last(1, 2, 3, 4, 5) - returns the last element of all values
     * @author Alexey Ershov
     */
    args : [],
    all : function (args, vals) {
        return vals[vals.length - 1];
    }
};

