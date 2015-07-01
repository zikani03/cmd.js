'use strict';

export const reverse = {

    /**
     * Command: reverse(1, [2, 3]) => [3, 2, 1]
     * @author Nate Ferrero
     */
    args : [],
    all : function (args, vals) {
        return vals.reverse();
    }
};

