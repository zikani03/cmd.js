'use strict';

export const sum = {

    /**
     * Command: sum(1, 2, 3, 4, 5) - returns the sum of all values
     * @author Nate Ferrero
     */
    args : [],
    all : function (args, vals) {
        var sum = 0;
        for (var i = vals.length; i--;) {
            sum += vals[i];
        }
        return sum;
    }
};

