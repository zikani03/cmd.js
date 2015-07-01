'use strict';

export const first = {

    /**
     * Command: first(1, 2, 3, 4, 5) - returns the first element of all values
     * @author Alexey Ershov
     */
    args : [],
    all : function (args, vals) {
        return vals[0];
    }
};

