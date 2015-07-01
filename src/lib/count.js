'use strict';

export const count = {

    /**
     * Command: count(1, [2, 3]) === 3
     * @author Nate Ferrero
     */
    args : [],
    all : function (args, vals) {
        return vals.length;
    }
};

